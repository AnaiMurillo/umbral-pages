// ==========================================================
// Cerebro de partículas (DESIGN.md §6): ambiente del Inicio.
// 420 partículas en computador, 260 en móvil. Se pausa fuera de pantalla
// y con la pestaña oculta. Con movimiento reducido: imagen fija.
// Sin sombras ni degradados: puntos y líneas de color plano.
// ==========================================================

type Particula = {
  tx: number; ty: number;      // destino (forma del cerebro), en coordenadas -1..1
  x: number; y: number;        // posición actual
  r: number;                   // radio en px (a escala 1)
  c: number;                   // índice de color
  fase: number; vel: number; amp: number;
  vecino: number;              // índice de la partícula con la que se une (o -1)
};

const quieto = () =>
  document.documentElement.hasAttribute('data-estatico') ||
  matchMedia('(prefers-reduced-motion: reduce)').matches;

// Generador pseudoaleatorio con semilla: el cerebro sale igual en cada visita.
function azar(semilla: number) {
  let s = semilla >>> 0;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
}

/** ¿El punto cae dentro de uno de los dos hemisferios (con la cisura en el medio)? */
function dentro(x: number, y: number) {
  if (Math.abs(x) < 0.035) return false;
  const lado = x < 0 ? -1 : 1;
  const cx = lado * 0.43, cy = 0.02;
  const dx = (x - cx) / 0.5, dy = (y - cy) / 0.74;
  // Base algo más plana: lóbulo temporal
  const corte = y > 0.5 && Math.abs(x) < 0.22;
  return dx * dx + dy * dy <= 1 && !corte;
}

function crearParticulas(n: number): Particula[] {
  const r = azar(20261020);
  const ps: Particula[] = [];
  // 65 % sobre "circunvoluciones" (anillos ondulados) y 35 % de relleno: textura de cerebro.
  while (ps.length < n) {
    let x: number, y: number;
    if (ps.length < n * 0.65) {
      const lado = r() < 0.5 ? -1 : 1;
      const anillo = 0.25 + Math.floor(r() * 5) * 0.17;
      const a = r() * Math.PI * 2;
      const onda = 1 + 0.07 * Math.sin(a * 9 + anillo * 12);
      x = lado * 0.43 + Math.cos(a) * 0.5 * anillo * onda;
      y = 0.02 + Math.sin(a) * 0.74 * anillo * onda;
    } else {
      x = r() * 2 - 1; y = r() * 2 - 1;
    }
    if (!dentro(x, y)) continue;
    ps.push({
      tx: x, ty: y,
      x: (r() * 2 - 1) * 1.6, y: (r() * 2 - 1) * 1.6,
      r: 1.6 + r() * 2.4,
      c: Math.floor(r() * 5),
      fase: r() * Math.PI * 2, vel: 0.4 + r() * 0.9, amp: 0.006 + r() * 0.012,
      vecino: -1,
    });
  }
  // Uniones: una de cada tres partículas se une con su vecina más cercana (red analítica).
  for (let i = 0; i < ps.length; i += 3) {
    let mejor = -1, dmin = Infinity;
    for (let j = 0; j < ps.length; j++) {
      if (j === i) continue;
      const d = (ps[i].tx - ps[j].tx) ** 2 + (ps[i].ty - ps[j].ty) ** 2;
      if (d < dmin) { dmin = d; mejor = j; }
    }
    if (dmin < 0.02) ps[i].vecino = mejor;
  }
  return ps;
}

export function iniciarCerebro(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const n = matchMedia('(min-width: 52rem)').matches ? 420 : 260;
  canvas.dataset.particulas = String(n);
  const ps = crearParticulas(n);

  let colores: string[] = [];
  let linea = '#1F2120';
  const leerColores = () => {
    const cs = getComputedStyle(document.documentElement);
    colores = ['--a1', '--a2', '--a3', '--a4', '--fg'].map((v) => cs.getPropertyValue(v).trim());
    linea = cs.getPropertyValue('--line').trim();
  };
  leerColores();

  let ancho = 0, alto = 0, escala = 1;
  const medir = () => {
    const dpr = Math.min(2, devicePixelRatio || 1);
    const caja = canvas.getBoundingClientRect();
    ancho = caja.width; alto = caja.height;
    canvas.width = Math.round(ancho * dpr);
    canvas.height = Math.round(alto * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    escala = Math.min(ancho, alto * 1.25) / 2.3;
  };

  const dibujar = (t: number, progreso: number) => {
    ctx.clearRect(0, 0, ancho, alto);
    const cx = ancho / 2, cy = alto / 2;
    const pos = (p: Particula) => {
      const ox = Math.cos(t * p.vel + p.fase) * p.amp;
      const oy = Math.sin(t * p.vel * 1.3 + p.fase) * p.amp;
      const x = p.x + (p.tx - p.x) * progreso + ox;
      const y = p.y + (p.ty - p.y) * progreso + oy;
      return [cx + x * escala, cy + y * escala];
    };
    // Uniones finas (aparecen cuando el cerebro ya está armado)
    if (progreso > 0.6) {
      ctx.globalAlpha = 0.22 * Math.min(1, (progreso - 0.6) / 0.4);
      ctx.strokeStyle = linea;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (const p of ps) {
        if (p.vecino < 0) continue;
        const [x1, y1] = pos(p); const [x2, y2] = pos(ps[p.vecino]);
        ctx.moveTo(x1, y1); ctx.lineTo(x2, y2);
      }
      ctx.stroke();
      ctx.globalAlpha = 1;
    }
    for (const p of ps) {
      const [x, y] = pos(p);
      ctx.fillStyle = colores[p.c];
      ctx.beginPath();
      ctx.arc(x, y, p.r * (escala / 180), 0, Math.PI * 2);
      ctx.fill();
    }
  };

  medir();

  // Imagen fija: movimiento reducido o versión estática
  if (quieto()) {
    canvas.dataset.estado = 'fijo';
    dibujar(0, 1);
    const repintar = () => { medir(); leerColores(); dibujar(0, 1); };
    addEventListener('resize', repintar);
    addEventListener('umbral:tema', repintar);
    matchMedia('(prefers-color-scheme: dark)').addEventListener('change', repintar);
    return;
  }

  let visible = false, raf = 0, inicio = 0, ultimo = 0, acumulado = 0, pausadoPorPersona = false;
  const DURACION_ARMADO = 2.6;
  const facil = (x: number) => 1 - Math.pow(1 - Math.min(1, x), 3);

  const cuadro = (ahora: number) => {
    if (!inicio) inicio = ahora;
    acumulado += Math.min(0.05, (ahora - (ultimo || ahora)) / 1000);
    ultimo = ahora;
    dibujar(acumulado, facil(acumulado / DURACION_ARMADO));
    raf = requestAnimationFrame(cuadro);
  };
  const arrancar = () => {
    if (raf || !visible || document.hidden || pausadoPorPersona) return;
    canvas.dataset.estado = 'animando';
    ultimo = 0;
    raf = requestAnimationFrame(cuadro);
  };
  const pausar = () => {
    cancelAnimationFrame(raf); raf = 0;
    canvas.dataset.estado = 'pausado';
  };

  // Botón de pausa (WCAG 2.2.2): la animación es continua, así que se puede detener.
  const boton = canvas.parentElement?.querySelector<HTMLButtonElement>('[data-cerebro-pausa]');
  if (boton) {
    boton.hidden = false;
    const texto = boton.querySelector('[data-cerebro-pausa-texto]');
    boton.addEventListener('click', () => {
      pausadoPorPersona = !pausadoPorPersona;
      boton.setAttribute('aria-pressed', String(pausadoPorPersona));
      if (texto) texto.textContent = pausadoPorPersona ? 'Reanudar animación' : 'Pausar animación';
      if (pausadoPorPersona) { pausar(); dibujar(acumulado, 1); acumulado = Math.max(acumulado, DURACION_ARMADO); } else arrancar();
    });
  }

  new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    visible ? arrancar() : pausar();
  }, { threshold: 0.05 }).observe(canvas);
  document.addEventListener('visibilitychange', () => (document.hidden ? pausar() : arrancar()));
  addEventListener('resize', medir);
  addEventListener('umbral:tema', leerColores);
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', leerColores);
}
