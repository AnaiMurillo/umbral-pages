// ==========================================================
// Cerebro de partículas (DESIGN.md §6): ambiente del Inicio.
// Cerebro de perfil (mirando a la izquierda): contorno con lóbulos, cerebelo,
// tronco y surcos. Las partículas llegan en orden (contorno → surcos → relleno)
// y luego una onda de actividad lo recorre sin parar.
// 420 partículas en computador, 260 en móvil. Se pausa fuera de pantalla y
// con la pestaña oculta. Con movimiento reducido: imagen fija.
// Colores planos, sin sombras ni degradados.
// ==========================================================

// Forma en una caja de 400 × 300.
const CONTORNO =
  'M58 150 C40 92 98 30 178 34 C238 14 318 38 344 94 C374 118 370 172 342 188 ' +
  'C330 204 302 210 286 204 C266 214 240 224 214 221 C190 240 150 242 128 222 C98 216 68 196 58 150 Z';
const CEREBELO = 'M262 220 C266 198 330 194 346 214 C354 240 302 258 272 246 C262 238 259 229 262 220 Z';
const TRONCO = 'M244 222 C250 246 252 266 254 288 L276 288 C272 262 272 244 268 224';
const SURCOS = [
  'M118 178 C160 166 202 162 252 178',          // cisura lateral
  'M206 40 C196 70 220 92 204 118 C194 136 214 150 206 166', // surco central (ondulado)
  'M150 198 C170 192 186 202 206 198 S236 204 246 210',      // surco temporal
  'M274 222 C298 216 324 220 340 226',           // folias del cerebelo
  'M276 235 C298 231 320 234 336 239',
];
/** Circunvoluciones: anillos ondulados que siguen el contorno hacia adentro. */
const ANILLOS = [
  { hacia: 0.17, onda: 6, frecuencia: 0.11 },
  { hacia: 0.36, onda: 7, frecuencia: 0.13 },
  { hacia: 0.56, onda: 6, frecuencia: 0.15 },
];
const CENTRO = { x: 205, y: 132 };

type Grupo = 0 | 1 | 2; // 0 contorno, 1 surco, 2 relleno
type Particula = {
  tx: number; ty: number; sx: number; sy: number;
  r: number; c: string; g: Grupo;
  antes: number;   // índice de la partícula anterior en la misma curva (para unir), o -1
  retraso: number; // segundos antes de empezar a llegar
  fase: number;
};

const quieto = () =>
  document.documentElement.hasAttribute('data-estatico') ||
  matchMedia('(prefers-reduced-motion: reduce)').matches;

function azar(semilla: number) {
  let s = semilla >>> 0;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
}

/** Puntos repartidos a lo largo de varias curvas SVG, en proporción a su longitud. */
function muestrearCurvas(ds: string[], total: number, r: () => number) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('style', 'position:absolute;width:0;height:0;visibility:hidden');
  document.body.appendChild(svg);
  const paths = ds.map((d) => {
    const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    p.setAttribute('d', d); svg.appendChild(p); return p;
  });
  const largos = paths.map((p) => p.getTotalLength());
  const suma = largos.reduce((a, b) => a + b, 0);
  const curvas: { x: number; y: number }[][] = paths.map((p, i) => {
    const n = Math.max(3, Math.round((total * largos[i]) / suma));
    return Array.from({ length: n }, (_, k) => {
      const pt = p.getPointAtLength((largos[i] * (k + r() * 0.35)) / n);
      return { x: pt.x + (r() - 0.5) * 2.5, y: pt.y + (r() - 0.5) * 2.5 };
    });
  });
  svg.remove();
  return curvas;
}

/** Puntos de los anillos de circunvoluciones, ya dentro del cerebro. */
function muestrearAnillos(total: number, r: () => number) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('style', 'position:absolute;width:0;height:0;visibility:hidden');
  document.body.appendChild(svg);
  const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  p.setAttribute('d', CONTORNO); svg.appendChild(p);
  const largo = p.getTotalLength();
  const forma = new Path2D(CONTORNO);
  const ctx = document.createElement('canvas').getContext('2d')!;
  const porAnillo = Math.round(total / ANILLOS.length);
  const curvas: { x: number; y: number }[][] = [];
  ANILLOS.forEach((a, k) => {
    let actual: { x: number; y: number }[] = [];
    const muestras = Math.round(porAnillo * 1.15);
    for (let i = 0; i < muestras; i++) {
      const l = (largo * (i + r() * 0.3)) / muestras;
      const pt = p.getPointAtLength(l);
      const dx = pt.x - CENTRO.x, dy = pt.y - CENTRO.y;
      const d = Math.hypot(dx, dy) || 1;
      const ondula = Math.sin(l * a.frecuencia + k * 1.7) * a.onda;
      const x = CENTRO.x + dx * (1 - a.hacia) + (dx / d) * ondula;
      const y = CENTRO.y + dy * (1 - a.hacia) + (dy / d) * ondula;
      // Fuera del cerebro o sobre la cisura lateral: se corta el anillo ahí.
      if (!ctx.isPointInPath(forma, x, y) || Math.abs(y - (178 - (x - 118) * 0)) < 5 && x > 118 && x < 252) {
        if (actual.length > 2) curvas.push(actual);
        actual = [];
        continue;
      }
      actual.push({ x, y });
    }
    if (actual.length > 2) curvas.push(actual);
  });
  svg.remove();
  return curvas;
}

function crearParticulas(n: number, colores: Record<string, string>): Particula[] {
  const r = azar(20261020);
  const ps: Particula[] = [];
  const nContorno = Math.round(n * 0.32), nSurcos = Math.round(n * 0.14), nAnillos = Math.round(n * 0.34);
  const elegir = (lista: string[]) => lista[Math.floor(r() * lista.length)];
  const salida = () => {
    const a = r() * Math.PI * 2, d = 260 + r() * 160;
    return { sx: 200 + Math.cos(a) * d, sy: 150 + Math.sin(a) * d * 0.8 };
  };

  const agregarCurvas = (curvas: { x: number; y: number }[][], g: Grupo, paleta: string[], rMin: number, rVar: number, t0: number) => {
    curvas.forEach((curva) => curva.forEach((pt, k) => {
      ps.push({
        tx: pt.x, ty: pt.y, ...salida(),
        r: rMin + r() * rVar, c: elegir(paleta), g,
        antes: k > 0 ? ps.length - 1 : -1,
        retraso: t0 + (pt.x / 400) * 0.5 + r() * 0.15,
        fase: r() * Math.PI * 2,
      });
    }));
  };

  agregarCurvas(muestrearCurvas([CONTORNO, CEREBELO, TRONCO], nContorno, r), 0,
    [colores.fg, colores.fg, colores.a1, colores.a2], 2.6, 1.4, 0);
  agregarCurvas(muestrearCurvas(SURCOS, nSurcos, r), 1,
    [colores.fg, colores.a2, colores.a1], 2.3, 1.1, 0.4);
  agregarCurvas(muestrearAnillos(nAnillos, r), 1,
    [colores.a1, colores.a2, colores.a1, colores.fg], 2.1, 1.1, 0.6);
  const inicioRelleno = ps.length;

  // Relleno: puntos dentro del cerebro y del cerebelo
  const lienzo = document.createElement('canvas').getContext('2d')!;
  const formas = [new Path2D(CONTORNO), new Path2D(CEREBELO)];
  let intentos = 0;
  while (ps.length < n && intentos++ < 20000) {
    const x = 50 + r() * 300, y = 30 + r() * 230;
    if (!formas.some((f) => lienzo.isPointInPath(f, x, y))) continue;
    ps.push({
      tx: x, ty: y, ...salida(), r: 1.6 + r() * 1.6,
      c: elegir([colores.a3, colores.a4, colores.a1, colores.a3]), g: 2,
      antes: -1, retraso: 0.9 + r() * 0.6, fase: r() * Math.PI * 2,
    });
  }
  // Relleno: cada uno se une con su vecino más cercano (red fina)
  for (let i = inicioRelleno; i < ps.length; i += 2) {
    let mejor = -1, dmin = Infinity;
    for (let j = 0; j < ps.length; j++) {
      if (j === i) continue;
      const d = (ps[i].tx - ps[j].tx) ** 2 + (ps[i].ty - ps[j].ty) ** 2;
      if (d < dmin) { dmin = d; mejor = j; }
    }
    if (dmin < 30 * 30) ps[i].antes = mejor;
  }
  return ps;
}

export function iniciarCerebro(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const n = matchMedia('(min-width: 52rem)').matches ? 420 : 260;
  canvas.dataset.particulas = String(n);

  const cs = getComputedStyle(document.documentElement);
  const colores = Object.fromEntries(['fg', 'a1', 'a2', 'a3', 'a4', 'line'].map((k) => [k, cs.getPropertyValue(`--${k}`).trim()]));
  const ps = crearParticulas(n, colores);

  let ancho = 0, alto = 0, escala = 1, ox = 0, oy = 0;
  const medir = () => {
    const dpr = Math.min(2, devicePixelRatio || 1);
    const caja = canvas.getBoundingClientRect();
    ancho = caja.width; alto = caja.height;
    canvas.width = Math.round(ancho * dpr);
    canvas.height = Math.round(alto * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    escala = Math.min(ancho / 420, alto / 315);
    ox = (ancho - 400 * escala) / 2;
    oy = (alto - 300 * escala) / 2 + 4 * escala;
  };

  const DUR = 1.6;
  const facil = (x: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, x)), 3);

  /** t en segundos. fijo = imagen final sin ondas (movimiento reducido). */
  const dibujar = (t: number, fijo = false) => {
    ctx.clearRect(0, 0, ancho, alto);
    // Onda de actividad: una franja que cruza el cerebro de izquierda a derecha cada 4,5 s
    const ciclo = 4.5;
    const frente = fijo ? -999 : ((t - 2.6) % ciclo) / ciclo * 520 - 60;
    const pos = new Float32Array(ps.length * 2);
    const llegada = new Float32Array(ps.length);

    for (let i = 0; i < ps.length; i++) {
      const p = ps[i];
      const k = fijo ? 1 : facil((t - p.retraso) / DUR);
      llegada[i] = k;
      const vaiven = fijo ? 0 : 0.9 * k;
      const x = p.sx + (p.tx - p.sx) * k + Math.cos(t * 0.9 + p.fase) * vaiven;
      const y = p.sy + (p.ty - p.sy) * k + Math.sin(t * 1.1 + p.fase) * vaiven;
      pos[i * 2] = ox + x * escala;
      pos[i * 2 + 1] = oy + y * escala;
    }

    // Uniones: contorno y surcos marcados; relleno muy suave
    ctx.lineCap = 'round';
    for (const [grupo, alfa, grosor] of [[0, 0.5, 1.4], [1, 0.4, 1.2], [2, 0.14, 1]] as const) {
      ctx.beginPath();
      for (let i = 0; i < ps.length; i++) {
        const p = ps[i];
        if (p.g !== grupo || p.antes < 0) continue;
        if (llegada[i] < 0.92 || llegada[p.antes] < 0.92) continue;
        if (Math.abs(p.tx - ps[p.antes].tx) + Math.abs(p.ty - ps[p.antes].ty) > 40) continue;
        ctx.moveTo(pos[i * 2], pos[i * 2 + 1]);
        ctx.lineTo(pos[p.antes * 2], pos[p.antes * 2 + 1]);
      }
      ctx.globalAlpha = alfa;
      ctx.strokeStyle = colores.line;
      ctx.lineWidth = grosor * Math.max(0.7, escala);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    for (let i = 0; i < ps.length; i++) {
      const p = ps[i];
      const cerca = Math.max(0, 1 - Math.abs(p.tx - frente) / 40); // dentro de la onda
      const radio = p.r * escala * (1 + cerca * 0.6 * llegada[i]);
      ctx.fillStyle = p.c;
      ctx.beginPath();
      ctx.arc(pos[i * 2], pos[i * 2 + 1], radio, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  medir();

  if (quieto()) {
    canvas.dataset.estado = 'fijo';
    dibujar(0, true);
    addEventListener('resize', () => { medir(); dibujar(0, true); });
    return;
  }

  let visible = false, raf = 0, ultimo = 0, t = 0;
  const cuadro = (ahora: number) => {
    t += Math.min(0.05, (ahora - (ultimo || ahora)) / 1000);
    ultimo = ahora;
    dibujar(t);
    raf = requestAnimationFrame(cuadro);
  };
  const arrancar = () => {
    if (raf || !visible || document.hidden) return;
    canvas.dataset.estado = 'animando';
    ultimo = 0;
    raf = requestAnimationFrame(cuadro);
  };
  const pausar = () => { cancelAnimationFrame(raf); raf = 0; canvas.dataset.estado = 'pausado'; };

  // Solo se detiene cuando no se ve (fuera de pantalla o pestaña oculta), para ahorrar batería.
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; visible ? arrancar() : pausar(); }, { threshold: 0.05 }).observe(canvas);
  document.addEventListener('visibilitychange', () => (document.hidden ? pausar() : arrancar()));
  addEventListener('resize', medir);
}
