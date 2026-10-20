<script lang="ts">
  // Componente de decisión forzada.
  // Mide: la opción elegida, el tiempo de reacción y los cambios de opinión.
  // Nada sale del navegador: el resultado solo se muestra en pantalla.
  interface Props {
    pregunta: string;
    opciones: string[];
    medirTiempo?: boolean;
    permitirCambio?: boolean;
    alDecidir?: (r: { opcion: number; ms: number | null; cambios: number }) => void;
  }
  let { pregunta, opciones, medirTiempo = true, permitirCambio = true, alDecidir }: Props = $props();

  let fase = $state<'espera' | 'eligiendo' | 'decidido'>(medirTiempo ? 'espera' : 'eligiendo');
  let elegida = $state<number | null>(null);
  let ms = $state<number | null>(null);
  let cambios = $state(0);
  let inicio = 0;
  let primeraOpcion: HTMLButtonElement | undefined = $state();

  const segundos = $derived(ms === null ? '' : (ms / 1000).toLocaleString('es-CO', { maximumFractionDigits: 1, minimumFractionDigits: 1 }));

  function empezar() {
    fase = 'eligiendo';
    inicio = performance.now();
    queueMicrotask(() => primeraOpcion?.focus());
  }

  function elegir(i: number) {
    if (fase === 'decidido' && elegida !== i) cambios += 1;
    if (fase === 'eligiendo' && medirTiempo) ms = Math.round(performance.now() - inicio);
    elegida = i;
    fase = 'decidido';
    alDecidir?.({ opcion: i, ms, cambios });
  }
</script>

<fieldset class="decision" class:decision--decidido={fase === 'decidido'}>
  <legend class="decision__pregunta">{pregunta}</legend>

  {#if fase === 'espera'}
    <p class="decision__ayuda">Cuando pulses, mediremos cuánto tardas en decidir. No se guarda nada.</p>
    <button type="button" class="boton boton--lleno" onclick={empezar}>Estoy listo</button>
  {:else}
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
    {/if}
  </p>
</fieldset>

<style>
  .decision {
    border: 2px solid var(--color-texto);
    border-radius: var(--radio);
    background: var(--color-superficie);
    padding: var(--e-3) var(--e-4) var(--e-2);
    margin: 0;
    min-width: 0;
  }
  .decision__pregunta { font-weight: 700; padding: 0 var(--e-2); }
  .decision__ayuda { font-size: var(--t-s); color: var(--color-texto-suave); margin: var(--e-2) 0 var(--e-3); }
  .decision__opciones { display: flex; flex-wrap: wrap; gap: var(--e-2); margin-top: var(--e-2); }
  .decision__opcion[aria-pressed='true'] { background: var(--color-invertido); color: var(--color-texto-inv); }
  .decision__opcion:disabled { opacity: 0.45; cursor: not-allowed; }
  .decision__resultado { min-height: 1.6em; margin: var(--e-2) 0 0; font-size: var(--t-s); }
</style>
