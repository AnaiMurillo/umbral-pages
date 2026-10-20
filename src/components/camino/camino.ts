// ==========================================================
// Motor del camino grueso (DESIGN.md §5b, §6).
// - Traza una cinta que pasa por la base de cada criatura (curvas amplias y diagonales).
// - La dibuja con stroke-dashoffset ligado al scroll (ease: none): la punta va
//   siempre a la misma altura de la pantalla. El scroll nunca se altera.
// - Arma cada criatura cuando la punta llega a su parada (ligado al scroll).
// - Dibuja las estelas y mueve los objetos con parallax.
// - Scrollama marca la parada activa (las demás bajan a 35 %).
// - Movimiento reducido o versión estática: camino completo y todo armado, quieto.
// ==========================================================
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import scrollama from 'scrollama';
import { camino as composiciones, type ComposicionCamino } from './composiciones';

gsap.registerPlugin(ScrollTrigger);

type Punto = { x: number; y: number; lado: -1 | 1 };

const quieto = () =>
  document.documentElement.hasAttribute('data-estatico') ||
  matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Calcula los puntos de paso: inicio, base de cada criatura y remate. */
function puntosDePaso(modulo: HTMLElement, comp: ComposicionCamino, anchoCinta: number): Punto[] {
  const caja = modulo.getBoundingClientRect();
  const W = caja.width;
  const puntos: Punto[] = [{ x: comp.inicio.x * W, y: comp.inicio.y, lado: comp.inicio.x > 0.5 ? 1 : -1 }];

  modulo.querySelectorAll<HTMLElement>('[data-parada] [data-ancla]').forEach((ancla) => {
    const svg = ancla.querySelector('svg') ?? ancla;
    const r = svg.getBoundingClientRect();
    const x = r.left - caja.left + r.width / 2;
    // La base se hunde un poco en la cinta: la criatura parece salir del camino.
    const y = r.bottom - caja.top - anchoCinta * (0.5 - comp.hundir);
    puntos.push({ x, y, lado: x > W / 2 ? 1 : -1 });
  });

  const fin = modulo.querySelector<HTMLElement>('[data-remate-ancla]');
  if (fin) {
    const r = fin.getBoundingClientRect();
    puntos.push({ x: r.left - caja.left, y: r.top - caja.top, lado: 1 });
  }
  return puntos;
}

/** Une los puntos con curvas Bézier. La y siempre crece: el camino nunca retrocede. */
function trazado(puntos: Punto[], comp: ComposicionCamino, W: number): string {
  let d = `M ${puntos[0].x.toFixed(1)} ${puntos[0].y.toFixed(1)}`;
  for (let i = 1; i < puntos.length; i++) {
    const a = puntos[i - 1];
    const b = puntos[i];
    const dy = b.y - a.y;
    // Vuelo: tras cada criatura la cinta se abre hacia el borde de su lado y vuelve.
    const c1x = a.x + a.lado * W * comp.vuelo;
    const c2x = b.x + b.lado * W * comp.vuelo * 0.6;
    const c1y = a.y + dy * comp.tension;
    const c2y = b.y - dy * comp.tension;
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
  }
  return d;
}

/** Tabla longitud → altura, para que la punta del trazo siga una altura fija en pantalla. */
function tablaAlturas(medida: SVGPathElement, muestras = 700) {
  const total = medida.getTotalLength();
  const ys = new Float32Array(muestras + 1);
  for (let i = 0; i <= muestras; i++) ys[i] = medida.getPointAtLength((total * i) / muestras).y;
  // Asegurar que sea creciente (la curva puede ondular levemente)
  for (let i = 1; i <= muestras; i++) if (ys[i] < ys[i - 1]) ys[i] = ys[i - 1];
  return (y: number) => {
    if (y <= ys[0]) return 0;
    if (y >= ys[muestras]) return 1;
    let lo = 0, hi = muestras;
    while (hi - lo > 1) {
      const mid = (lo + hi) >> 1;
      if (ys[mid] < y) lo = mid; else hi = mid;
    }
    const t = (y - ys[lo]) / Math.max(1e-6, ys[hi] - ys[lo]);
    return (lo + t) / muestras;
  };
}

function leerDesde(el: Element) {
  const [x = 0, y = 0, r = 0, s = 1] = (el.getAttribute('data-desde') ?? '').split(/\s+/).map(Number);
  return { x, y, rotation: r, scale: s };
}

function prepararModulo(modulo: HTMLElement) {
  const svg = modulo.querySelector<SVGSVGElement>('[data-camino] svg');
  const cinta = modulo.querySelector<SVGPathElement>('[data-cinta]');
  const medida = modulo.querySelector<SVGPathElement>('[data-medida]');
  if (!svg || !cinta || !medida) return;

  // Scrollama: parada activa (siempre, también en modo quieto marca la actual sin atenuar).
  const paradas = Array.from(modulo.querySelectorAll<HTMLElement>('[data-parada]'));
  if (paradas.length) {
    paradas[0].setAttribute('data-activa', '');
    const scroller = scrollama();
    scroller.setup({ step: paradas, offset: 0.55 }).onStepEnter(({ element }) => {
      paradas.forEach((p) => p.toggleAttribute('data-activa', p === element));
    });
    addEventListener('resize', () => scroller.resize());
  }

  const mm = gsap.matchMedia();
  mm.add(
    {
      computador: '(min-width: 52rem)',
      movil: '(max-width: 51.99rem)',
      reducido: '(prefers-reduced-motion: reduce)',
    },
    (ctx) => {
      const { computador, reducido } = ctx.conditions as Record<string, boolean>;
      const comp = composiciones[computador ? 'computador' : 'movil'];
      const sinMovimiento = reducido || quieto();
      const triggers: ScrollTrigger[] = [];
      let alturaDeTramo: (y: number) => number = () => 1;

      const dibujarTrazado = () => {
        const caja = modulo.getBoundingClientRect();
        const W = caja.width, H = caja.height;
        const ancho = comp.ancho(innerWidth);
        svg.setAttribute('viewBox', `0 0 ${W.toFixed(0)} ${H.toFixed(0)}`);
        const d = trazado(puntosDePaso(modulo, comp, ancho), comp, W);
        cinta.setAttribute('d', d);
        medida.setAttribute('d', d);
        cinta.style.strokeWidth = `${ancho}px`;
        cinta.setAttribute('pathLength', '1');
        alturaDeTramo = tablaAlturas(medida);
      };

      // La punta del camino sigue una altura fija de la pantalla.
      const avanzar = () => {
        const yPunta = scrollY + innerHeight * comp.punta - (modulo.getBoundingClientRect().top + scrollY);
        cinta.style.strokeDashoffset = String(1 - alturaDeTramo(yPunta));
      };

      dibujarTrazado();

      if (sinMovimiento) {
        modulo.removeAttribute('data-animado');
        cinta.style.strokeDasharray = 'none';
        cinta.style.strokeDashoffset = '0';
        const alCambiarTamano = () => dibujarTrazado();
        addEventListener('resize', alCambiarTamano);
        return () => removeEventListener('resize', alCambiarTamano);
      }

      modulo.setAttribute('data-animado', '');
      cinta.style.strokeDasharray = '1 1';

      // 1. Camino ligado al scroll
      triggers.push(
        ScrollTrigger.create({
          trigger: modulo,
          start: 'top bottom',
          end: 'bottom top',
          onUpdate: avanzar,
          onRefresh: () => { dibujarTrazado(); avanzar(); },
        }),
      );
      avanzar();

      // 2. Criaturas que se arman cuando llega la punta (ease: none, ligado al scroll)
      modulo.querySelectorAll<HTMLElement>('[data-parada]').forEach((parada) => {
        const ancla = parada.querySelector<HTMLElement>('[data-ancla]');
        if (!ancla) return;
        const piezas = ancla.querySelectorAll<SVGGElement>('[data-pieza]');
        const tl = gsap.timeline({
          defaults: { ease: 'none', duration: 1 },
          scrollTrigger: {
            trigger: ancla,
            // Se arma mientras la base sube del borde inferior hasta justo bajo la punta.
            start: `bottom ${Math.round(comp.punta * 100 + 26)}%`,
            end: `bottom ${Math.round(comp.punta * 100 - 4)}%`,
            scrub: 0.5,
          },
        });
        piezas.forEach((p, i) => tl.from(p, { ...leerDesde(p), opacity: 0 }, i * 0.18));
        if (tl.scrollTrigger) triggers.push(tl.scrollTrigger);

        // 3. Estelas que se dibujan
        ancla.querySelectorAll<SVGPathElement>('[data-estela-mascara]').forEach((m) => {
          m.style.strokeDasharray = '1 1';
          const t = gsap.fromTo(m, { strokeDashoffset: 1 }, {
            strokeDashoffset: 0, ease: 'none',
            scrollTrigger: { trigger: ancla, start: 'top 85%', end: 'bottom 45%', scrub: 0.5 },
          });
          if (t.scrollTrigger) triggers.push(t.scrollTrigger);
        });

        // 4. Objetos flotantes con parallax a distinta velocidad
        ancla.querySelectorAll<HTMLElement>('[data-parallax]').forEach((o) => {
          const v = Number(o.dataset.parallax) || 0;
          const recorrido = (computador ? 90 : 40) * v;
          const t = gsap.fromTo(o, { y: recorrido }, {
            y: -recorrido, ease: 'none',
            scrollTrigger: { trigger: parada, start: 'top bottom', end: 'bottom top', scrub: true },
          });
          if (t.scrollTrigger) triggers.push(t.scrollTrigger);
        });
      });

      // 5. Remate: colinas que suben al final del camino
      const paisaje = modulo.querySelector('[data-remate-ancla]')?.parentElement;
      if (paisaje) {
        const piezas = Array.from(paisaje.querySelectorAll<SVGGElement>('[data-pieza-remate]')).filter((p) => p.getBoundingClientRect().width > 0);
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: paisaje, start: 'top 95%', end: 'bottom 85%', scrub: 0.5 },
        });
        piezas.forEach((p, i) => tl.from(p, { scaleY: 0, y: 30, opacity: 0, duration: 1 }, i * 0.15));
        if (tl.scrollTrigger) triggers.push(tl.scrollTrigger);
      }

      // Las fuentes cargan después y mueven el layout: recalcular.
      document.fonts?.ready.then(() => ScrollTrigger.refresh());

      return () => {
        triggers.forEach((t) => t.kill());
        modulo.removeAttribute('data-animado');
      };
    },
  );
}

export function iniciarCaminos() {
  document.querySelectorAll<HTMLElement>('[data-modulo-camino]').forEach(prepararModulo);
}
