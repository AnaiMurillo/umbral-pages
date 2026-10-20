<script lang="ts">
  // Gráfico reutilizable para la escena jugable: una muestra de personas (puntos)
  // y cuántas responden de cierta forma CON y SIN el mecanismo que el módulo investiga.
  //
  // - Escucha el evento "umbral:paso" de su <EscenaFija> para saber qué paso se lee.
  // - El lector puede activar o quitar el mecanismo con un interruptor.
  // - Incluye una decisión forzada; la respuesta del lector se suma como "tú".
  // - Versión estática: muestra ambos resultados a la vez y una tabla en texto.
  import { onMount } from 'svelte';
  import { scaleBand } from 'd3-scale';
  import { range } from 'd3-array';
  import DecisionForzada from '../decision/DecisionForzada.svelte';

  type Estado = { mecanismo: 'con' | 'sin' | null; decision?: boolean };
  interface Props {
    titulo: string;
    mecanismo: string;           // p. ej. "sello de verificación"
    respuestaSi: string;         // p. ej. "confía"
    respuestaNo: string;         // p. ej. "no confía"
    total?: number;
    valorCon: number;            // cuántas personas responden "sí" con el mecanismo
    valorSin: number;            // ... y sin él
    pasos: Estado[];             // estado del gráfico para cada <Paso>
    pregunta: string;
    opciones: [string, string];  // opción 0 = respuestaSi, opción 1 = respuestaNo
    nota: string;                // origen de los datos (visible siempre)
    respuestas?: string[];       // respuesta inmediata por opción
  }
  let { titulo, mecanismo, respuestaSi, respuestaNo, total = 100, valorCon, valorSin, pasos, pregunta, opciones, nota, respuestas = [] }: Props = $props();

  let raiz: HTMLElement;
  let paso = $state(0);
  let estatico = $state(false);
  let manual = $state<'con' | 'sin' | null>(null);   // elección del lector con el interruptor
  let miRespuesta = $state<number | null>(null);

  const estado = $derived(pasos[Math.min(paso, pasos.length - 1)] ?? { mecanismo: null });
  const modo = $derived(estatico ? (manual ?? 'con') : (manual ?? estado.mecanismo));
  const valor = $derived(modo === 'con' ? valorCon : modo === 'sin' ? valorSin : 0);
  const mostrarDecision = $derived(estatico || !!estado.decision);
  const interruptorVisible = $derived(estatico || estado.mecanismo !== null);

  // Cuadrícula
  const columnas = 10;
  const filas = $derived(Math.ceil(total / columnas));
  const ancho = 300;
  const alto = $derived((ancho / columnas) * filas);
  const x = $derived(scaleBand<number>().domain(range(columnas)).range([0, ancho]).padding(0.25));
  const y = $derived(scaleBand<number>().domain(range(filas)).range([0, alto]).padding(0.25));

  // Orden pseudoaleatorio fijo, para que los puntos cambien de forma orgánica y estable
  const rango = $derived(
    range(total)
      .map((i) => ({ i, k: Math.sin(i * 12.9898 + 78.233) * 43758.5453 % 1 }))
      .sort((a, b) => a.k - b.k)
      .reduce((acc, d, r) => { acc[d.i] = r; return acc; }, [] as number[])
  );
  const puntos = $derived(range(total).map((i) => ({
    i,
    cx: (x(i % columnas) ?? 0) + x.bandwidth() / 2,
    cy: (y(Math.floor(i / columnas)) ?? 0) + y.bandwidth() / 2,
    si: modo !== null && rango[i] < valor,
  })));

  const resumen = $derived(
    modo === null
      ? `${total} personas de la muestra, aún sin el mecanismo en juego.`
      : `${modo === 'con' ? 'Con' : 'Sin'} ${mecanismo}: ${valor} de ${total} personas ${respuestaSi}.`
  );

  onMount(() => {
    const escena = raiz.closest<HTMLElement>('[data-escena-fija]');
    const reducido = matchMedia('(prefers-reduced-motion: reduce)');
    estatico = document.documentElement.hasAttribute('data-estatico') || reducido.matches || escena?.dataset.modo === 'estatico';
    if (escena?.dataset.paso) paso = Number(escena.dataset.paso);

    const alPaso = (e: Event) => {
      paso = (e as CustomEvent<{ indice: number }>).detail.indice;
      manual = null; // el texto manda; el lector puede volver a tocar el interruptor
    };
    const alEstatico = () => (estatico = true);
    escena?.addEventListener('umbral:paso', alPaso);
    escena?.addEventListener('umbral:estatico', alEstatico);
    return () => {
      escena?.removeEventListener('umbral:paso', alPaso);
      escena?.removeEventListener('umbral:estatico', alEstatico);
    };
  });
</script>

<div class="grafico" class:grafico--estatico={estatico} bind:this={raiz}>
  <p class="grafico__titulo">{titulo}</p>

  {#if interruptorVisible}
    <div class="grafico__control" role="group" aria-label="Mecanismo">
      <span>{mecanismo}:</span>
      <button type="button" class="chip" aria-pressed={modo === 'con'} onclick={() => (manual = 'con')}>Activado</button>
      <button type="button" class="chip" aria-pressed={modo === 'sin'} onclick={() => (manual = 'sin')}>Quitado</button>
    </div>
  {/if}

  <div class="grafico__lienzo">
    <svg viewBox={`-4 -4 ${ancho + 8} ${alto + 8}`} role="img" aria-label={resumen}>
      {#each puntos as p (p.i)}
        <circle cx={p.cx} cy={p.cy} r={x.bandwidth() / 2} class:si={p.si} />
      {/each}
    </svg>
    <p class="grafico__cifra" aria-hidden="true">
      {#if modo !== null}<strong>{valor}</strong> de {total} {respuestaSi}{/if}
    </p>
  </div>

  <p class="grafico__leyenda">
    <span class="punto punto--si" aria-hidden="true"></span> {respuestaSi}
    <span class="punto" aria-hidden="true"></span> {respuestaNo}
    {#if miRespuesta !== null}
      <span class="punto punto--tu" aria-hidden="true"></span> tú: {miRespuesta === 0 ? respuestaSi : respuestaNo}
    {/if}
  </p>

  {#if mostrarDecision}
    <div class="grafico__decision">
      <DecisionForzada {pregunta} opciones={opciones} {respuestas} alDecidir={(r) => (miRespuesta = r.opcion)} />
    </div>
  {/if}

  {#if estatico}
    <table class="grafico__tabla">
      <caption class="visualmente-oculto">{titulo}</caption>
      <thead><tr><th scope="col">Condición</th><th scope="col">{respuestaSi}</th><th scope="col">{respuestaNo}</th></tr></thead>
      <tbody>
        <tr><th scope="row">Con {mecanismo}</th><td>{valorCon}</td><td>{total - valorCon}</td></tr>
        <tr><th scope="row">Sin {mecanismo}</th><td>{valorSin}</td><td>{total - valorSin}</td></tr>
      </tbody>
    </table>
  {/if}

  <p class="grafico__nota">{nota}</p>
  <p class="visualmente-oculto" aria-live="polite">{resumen}</p>
</div>

<style>
  .grafico { display: flex; flex-direction: column; gap: var(--s-3); }
  .grafico__titulo { font-family: var(--font-title); font-weight: 700; font-size: var(--t-lead); margin: 0; letter-spacing: -0.01em; }

  .grafico__control { display: flex; flex-wrap: wrap; align-items: center; gap: var(--s-2); font-size: var(--t-small); }
  .chip {
    min-height: 44px; padding: 0 var(--s-3);
    border: 1.5px solid var(--outline); border-radius: var(--r-pill);
    background: var(--surface); color: var(--fg); cursor: pointer;
  }
  .chip[aria-pressed='true'] { background: var(--btn-bg); color: var(--btn-fg); border-color: var(--btn-bg); }

  .grafico__lienzo {
    display: flex; align-items: center; gap: var(--s-4);
    background: var(--band); border-radius: calc(var(--r-card) * 0.7); padding: var(--s-3) var(--s-4);
  }
  .grafico__lienzo svg { width: min(15rem, 58%); height: auto; flex: none; }
  circle { fill: var(--surface); stroke: var(--fg); stroke-width: 1.5; transition: fill 400ms var(--ease); }
  circle.si { fill: var(--fg); }
  .grafico__cifra { font-size: var(--t-small); margin: 0; }
  .grafico__cifra strong {
    display: block; font-family: var(--font-title); font-weight: 800; font-size: clamp(2.6rem, 2rem + 2vw, 3.6rem);
    line-height: 1; letter-spacing: -0.04em;
  }

  .grafico__leyenda { display: flex; flex-wrap: wrap; align-items: center; gap: var(--s-1) var(--s-2); font-size: var(--t-label); margin: 0; }
  .punto { display: inline-block; width: 0.8rem; height: 0.8rem; border-radius: 50%; border: 1.5px solid var(--fg); background: var(--surface); }
  .punto--si { background: var(--fg); }
  .punto--tu { background: var(--a2); border-color: var(--a2); }

  .grafico__decision { border-top: 1.5px solid var(--outline); padding-top: var(--s-3); }
  .grafico__tabla { border-collapse: collapse; font-size: var(--t-small); width: 100%; }
  .grafico__tabla th, .grafico__tabla td { border: 1px solid var(--outline); padding: var(--s-1) var(--s-2); text-align: left; }
  .grafico__nota { font-size: var(--t-label); color: var(--muted); margin: 0; }
</style>
