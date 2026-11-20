<script lang="ts">
  // Interacción 2 · Encuentra el botón (Artículo 01, escena 3).
  // Pantalla ficticia de ajustes: "Suspender cuenta" grande y llamativo, "Cancelar"
  // pequeño y gris al fondo. Mide el tiempo y los toques en otra cosa; después muestra
  // la misma pantalla con el botón visible. Los resultados solo se ven en pantalla.
  import { tick } from 'svelte';

  type Medida = { ms: number; toques: number };
  let fase = $state<'inicio' | 'escondido' | 'visible' | 'fin'>('inicio');
  let medidas = $state<Medida[]>([]);
  let inicio = 0;
  let toques = $state(0);
  let pantalla: HTMLElement | undefined = $state();
  let empezar: HTMLButtonElement | undefined = $state();

  const segundos = (ms: number) => (ms / 1000).toLocaleString('es-CO', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const toquesTxt = (n: number) => `${n} ${n === 1 ? 'toque' : 'toques'} en otra cosa`;

  async function arrancar(f: 'escondido' | 'visible') {
    fase = f; toques = 0; inicio = performance.now();
    await tick();
    pantalla?.focus();
  }
  function otraCosa() { toques += 1; }
  async function cancelar(e: Event) {
    e.stopPropagation();
    medidas = [...medidas, { ms: performance.now() - inicio, toques }];
    if (fase === 'escondido') arrancar('visible');
    else { fase = 'fin'; await tick(); pantalla?.focus(); }
  }
  async function salir() {
    fase = 'inicio'; medidas = []; toques = 0;
    await tick();
    empezar?.focus();
  }
</script>

<div class="interaccion">
  <p class="interaccion__etiqueta etiqueta">Interacción 2 · Encuentra el botón</p>
  <p class="interaccion__instruccion">Una pantalla ficticia de ajustes de cuenta, con "Suspender cuenta" grande y llamativo y "Cancelar" pequeño y gris al fondo. Mide cuánto tardas y cuántas veces tocas otra cosa; después ves la misma pantalla con el botón visible. Esto es una simulación. No se guarda nada.</p>

  {#if fase === 'inicio'}
    <button type="button" class="boton" bind:this={empezar} onclick={() => arrancar('escondido')}>Empezar</button>
  {:else}
    <div class="demo">
      <div class="demo__aviso">
        <p>Esto es una simulación. No se guarda nada.</p>
        <button type="button" class="boton boton--claro demo__salir" onclick={salir}>Salir de la demostración</button>
      </div>

      {#if fase !== 'fin'}
        <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
        <div class="telefono" onclick={otraCosa}>
          <p class="telefono__titulo" tabindex="-1" bind:this={pantalla}>Ajustes de cuenta</p>
          <button type="button" class="telefono__suspender" onclick={(e) => { e.stopPropagation(); otraCosa(); }}>Suspender cuenta</button>
          {#if fase === 'escondido'}
            <button type="button" class="telefono__cancelar telefono__cancelar--escondido" onclick={cancelar}>Cancelar</button>
          {:else}
            <button type="button" class="telefono__suspender telefono__cancelar--visible" onclick={cancelar}>Cancelar</button>
          {/if}
        </div>
      {/if}

      <div aria-live="polite">
        {#if fase === 'fin'}
          <div class="resultado" tabindex="-1" bind:this={pantalla}>
            <p><strong>Botón escondido:</strong> {segundos(medidas[0].ms)} s · {toquesTxt(medidas[0].toques)}</p>
            <p><strong>Botón visible:</strong> {segundos(medidas[1].ms)} s · {toquesTxt(medidas[1].toques)}</p>
          </div>
        {/if}
      </div>
    </div>
  {/if}
</div>

<style>
  .interaccion { border: 2.5px solid var(--outline); border-radius: calc(var(--r-card) * 0.7); padding: var(--s-4); margin: var(--s-4) 0 0; background: var(--surface); }
  .interaccion__etiqueta { font-weight: 700; color: var(--fg); }
  .interaccion__instruccion { margin: var(--s-2) 0 var(--s-4); }
  .demo { display: grid; gap: var(--s-3); }
  .demo__aviso {
    position: sticky; top: 4.5rem; z-index: 2;
    display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: var(--s-2);
    background: var(--mantequilla); color: var(--on-color); border-radius: 16px; padding: var(--s-2) var(--s-3);
  }
  .demo__aviso p { margin: 0; font-weight: 700; font-size: var(--t-small); }
  .demo__salir { font-size: var(--t-small); }
  .telefono {
    width: min(100%, 20rem); margin-inline: auto; min-height: 30rem;
    display: flex; flex-direction: column; gap: var(--s-3);
    border: 2.5px solid var(--outline); border-radius: 32px; padding: var(--s-5) var(--s-4) var(--s-3);
    background: var(--bg); cursor: default;
  }
  .telefono__titulo { font-family: var(--font-title); font-weight: 800; font-size: var(--t-lead); margin: 0 0 var(--s-3); outline-offset: 4px; }
  .telefono__suspender {
    min-height: 56px; border: 0; border-radius: 999px; cursor: pointer;
    background: var(--pilar); color: var(--on-color);
    font: inherit; font-family: var(--font-title); font-weight: 800; font-size: 1.15rem;
  }
  /* Pequeño y gris al fondo, pero con área táctil de 44 px y contraste AA. */
  .telefono__cancelar--escondido {
    margin-top: auto; align-self: center;
    min-height: 44px; min-width: 44px; padding: 0 var(--s-2);
    border: 0; background: none; cursor: pointer;
    font: inherit; font-size: 0.78rem; color: var(--muted);
  }
  .telefono__cancelar--visible { margin-top: 0; }
  .resultado { outline-offset: 4px; }
  .resultado p { margin: 0 0 var(--s-2); }
</style>
