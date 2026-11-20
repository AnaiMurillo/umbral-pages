<script lang="ts">
  // Interacción 1 · Tu predicción contra la realidad (Artículo 01, escena 2).
  // Dos controles: cuántas veces crees que usarás un servicio este mes y cuántas
  // lo usaste el mes pasado. Muestra tu brecha junto a la del estudio (9,5 / 4,2).
  // Todo ocurre en el navegador: no se guarda ni se envía nada.
  const ESTUDIO = { esperadas: 9.5, reales: 4.2 };
  const MAX = 31;
  const uid = Math.random().toString(36).slice(2, 8);

  let servicio = $state('');
  let crees = $state(0);
  let usaste = $state(0);
  let visto = $state(false);

  const num = (v: number) => v.toLocaleString('es-CO', { maximumFractionDigits: 1 });
  const anchoDe = (v: number) => `${Math.min(100, (v / MAX) * 100)}%`;
  const nombre = $derived(servicio.trim() || 'Tú');
  const resumen = $derived(
    `${nombre}: ${num(crees)} esperadas, ${num(usaste)} reales. Estudio: 9,5 esperadas, 4,2 reales.`,
  );
</script>

<div class="interaccion">
  <p class="interaccion__etiqueta etiqueta">Interacción 1 · Tu predicción contra la realidad</p>
  <p class="interaccion__instruccion">Elige un servicio que pagas. Mueve un control para decir cuántas veces crees que lo usarás este mes y otro para cuántas lo usaste el mes pasado. Verás tu brecha junto a la del estudio (9,5 esperadas, 4,2 reales). Todo ocurre en tu navegador; no se guarda nada.</p>

  <div class="campos">
    <label class="campo">
      <span class="campo__nombre">Elige un servicio que pagas</span>
      <input type="text" bind:value={servicio} autocomplete="off" maxlength="40" />
    </label>
    <label class="campo" for="crees-{uid}">
      <span class="campo__nombre">Cuántas veces crees que lo usarás este mes: <output for="crees-{uid}">{crees}</output></span>
      <input id="crees-{uid}" type="range" min="0" max={MAX} step="1" bind:value={crees} />
    </label>
    <label class="campo" for="usaste-{uid}">
      <span class="campo__nombre">Cuántas lo usaste el mes pasado: <output for="usaste-{uid}">{usaste}</output></span>
      <input id="usaste-{uid}" type="range" min="0" max={MAX} step="1" bind:value={usaste} />
    </label>
  </div>

  <button type="button" class="boton" onclick={() => (visto = true)}>Ver mi brecha</button>

  <div class="resultado" aria-live="polite">
    {#if visto}
      <p class="visualmente-oculto">{resumen}</p>
      <div class="brechas" aria-hidden="true">
        {#each [{ q: nombre, e: crees, r: usaste }, { q: 'Estudio', e: ESTUDIO.esperadas, r: ESTUDIO.reales }] as fila}
          <div class="brecha">
            <p class="brecha__quien">{fila.q}</p>
            <div class="brecha__fila"><span class="brecha__nombre">esperadas</span><span class="brecha__pista"><span class="brecha__barra brecha__barra--e" style="width: {anchoDe(fila.e)}"></span></span><span class="brecha__valor">{num(fila.e)}</span></div>
            <div class="brecha__fila"><span class="brecha__nombre">reales</span><span class="brecha__pista"><span class="brecha__barra brecha__barra--r" style="width: {anchoDe(fila.r)}"></span></span><span class="brecha__valor">{num(fila.r)}</span></div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>

<style>
  .interaccion { border: 2.5px solid var(--outline); border-radius: calc(var(--r-card) * 0.7); padding: var(--s-4); margin: var(--s-4) 0 0; background: var(--surface); }
  .interaccion__etiqueta { font-weight: 700; color: var(--fg); }
  .interaccion__instruccion { margin: var(--s-2) 0 var(--s-4); }
  .campos { display: grid; gap: var(--s-3); margin-bottom: var(--s-4); }
  .campo { display: grid; gap: var(--s-1); }
  .campo__nombre { font-weight: 700; }
  input[type='text'] { min-height: 44px; padding: 0 var(--s-3); border: 1.5px solid var(--outline); border-radius: 12px; background: var(--bg); color: var(--fg); font: inherit; }
  input[type='range'] { width: 100%; min-height: 44px; accent-color: var(--fg); }
  output { font-family: var(--font-title); font-weight: 800; }
  .resultado { margin-top: var(--s-4); }
  .brechas { display: grid; gap: var(--s-4); }
  @media (min-width: 40rem) { .brechas { grid-template-columns: 1fr 1fr; } }
  .brecha__quien { font-family: var(--font-title); font-weight: 700; margin-bottom: var(--s-2); overflow-wrap: anywhere; }
  .brecha__fila { display: grid; grid-template-columns: 5.5rem 1fr 2.5rem; align-items: center; gap: var(--s-2); margin-bottom: var(--s-2); font-size: var(--t-small); }
  .brecha__pista { height: 1rem; border-radius: 999px; background: var(--band); overflow: hidden; }
  .brecha__barra { display: block; height: 100%; border-radius: 999px; outline: 1.5px solid var(--outline); outline-offset: -1.5px; }
  .brecha__barra--e { background: var(--pilar); }
  .brecha__barra--r { background: var(--menta); }
  .brecha__valor { font-family: var(--font-title); font-weight: 800; text-align: right; }
</style>
