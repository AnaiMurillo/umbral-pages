<script lang="ts">
  // Componente de decisión forzada.
  // Mide: la opción elegida, el tiempo de reacción y los cambios de opinión.
  // Nada sale del navegador: el resultado solo se muestra en pantalla.
  interface Props {
    pregunta: string;
    opciones: string[];
    medirTiempo?: boolean;
    permitirCambio?: boolean;
    /** Respuesta inmediata que se muestra tras elegir cada opción (mismo orden que opciones). */
    respuestas?: string[];
    alDecidir?: (r: { opcion: number; ms: number | null; cambios: number }) => void;
  }
  let { pregunta, opciones, medirTiempo = true, permitirCambio = true, respuestas = [], alDecidir }: Props = $props();

  import { onMount } from 'svelte';
  // Respuesta inmediata (DESIGN §7): las opciones se ven de una vez. El tiempo de
  // reacción se mide desde que las opciones aparecen en pantalla por primera vez.
  let fase = $state<'eligiendo' | 'decidido'>('eligiendo');
  let caja: HTMLFieldSetElement;
  let elegida = $state<number | null>(null);
  let ms = $state<number | null>(null);
  let cambios = $state(0);
  let inicio = 0;
  let primeraOpcion: HTMLButtonElement | undefined = $state();

  const segundos = $derived(ms === null ? '' : (ms / 1000).toLocaleString('es-CO', { maximumFractionDigits: 1, minimumFractionDigits: 1 }));

  onMount(() => {
    if (!medirTiempo) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !inicio) { inicio = performance.now(); io.disconnect(); }
    }, { threshold: 0.6 });
    io.observe(caja);
    return () => io.disconnect();
  });

  function elegir(i: number) {
    if (fase === 'decidido' && elegida !== i) cambios += 1;
    if (fase === 'eligiendo' && medirTiempo && inicio) ms = Math.round(performance.now() - inicio);
    elegida = i;
    fase = 'decidido';
    alDecidir?.({ opcion: i, ms, cambios });
  }
</script>

<fieldset class="decision" class:decision--decidido={fase === 'decidido'} bind:this={caja}>
  <legend class="decision__pregunta">{pregunta}</legend>

  {#if medirTiempo}<p class="decision__ayuda">Medimos cuánto tardas en decidir. No se guarda nada.</p>{/if}
  {#if true}
    <div class="decision__opciones">
      {#each opciones as opcion, i}
        {#if i === 0}
          <button
            type="button"
            class="boton decision__opcion"
            aria-pressed={elegida === i}
            disabled={fase === 'decidido' && !permitirCambio && elegida !== i}
            bind:this={primeraOpcion}
            onclick={() => elegir(i)}>{opcion}</button>
        {:else}
          <button
            type="button"
            class="boton decision__opcion"
            aria-pressed={elegida === i}
            disabled={fase === 'decidido' && !permitirCambio && elegida !== i}
            onclick={() => elegir(i)}>{opcion}</button>
        {/if}
      {/each}
    </div>
  {/if}

  <p class="decision__resultado" aria-live="polite">
    {#if fase === 'decidido' && elegida !== null}
      {`Elegiste «${opciones[elegida]}»`}{#if ms !== null}{` en ${segundos} s`}{/if}.
      {#if cambios > 0}{` Cambiaste de opinión ${cambios} ${cambios === 1 ? 'vez' : 'veces'}.`}{/if}
      {#if respuestas[elegida]}<span class="decision__respuesta">{respuestas[elegida]}</span>{/if}
    {/if}
  </p>
</fieldset>

<style>
  .decision {
    border: 0; margin: 0; padding: 0; min-width: 0;
  }
  .decision__pregunta { font-family: var(--font-title); font-weight: 700; font-size: var(--t-lead); letter-spacing: -0.01em; padding: 0; margin-bottom: var(--s-2); }
  .decision__ayuda { font-size: var(--t-small); color: var(--muted); margin: 0 0 var(--s-3); }
  .decision__opciones { display: flex; flex-wrap: wrap; gap: var(--s-2); }
  .decision__opcion { background: var(--surface); color: var(--fg); border-color: var(--outline); }
  .decision__opcion[aria-pressed='true'] { background: var(--a4); color: var(--on-color); border-color: var(--on-color); }
  .decision__opcion:disabled { opacity: 0.45; cursor: not-allowed; }
  .decision__resultado { min-height: 1.6em; margin: var(--s-3) 0 0; font-size: var(--t-small); }
  .decision__respuesta {
    display: block; margin-top: var(--s-2); padding: var(--s-2) var(--s-3);
    background: var(--highlight); color: var(--on-color); border-radius: 14px; font-size: var(--t-body);
  }
</style>
