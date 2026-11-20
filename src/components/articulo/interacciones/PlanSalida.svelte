<script lang="ts">
  // Interacción 3 · Mi plan de salida (Artículo 01, escena 5).
  // Cinco casillas y "Copiar mi lista" al portapapeles. No se guarda nada.
  const pasos = ['Miro mi uso real', 'Reviso mi extracto', 'Decido hoy', 'Cancelo hoy', 'Guardo la constancia'];
  let marcados = $state(pasos.map(() => false));
  let estado = $state('');

  async function copiar() {
    const texto = ['Mi plan de salida', ...pasos.map((p, i) => `${marcados[i] ? '☑' : '☐'} ${p}`)].join('\n');
    try {
      await navigator.clipboard.writeText(texto);
      estado = 'Lista copiada.';
    } catch {
      estado = 'No se pudo copiar. Selecciona el texto y cópialo.';
    }
  }
</script>

<div class="interaccion">
  <p class="interaccion__etiqueta etiqueta">Interacción 3 · Mi plan de salida</p>
  <fieldset class="pasos">
    <legend class="visualmente-oculto">Mi plan de salida</legend>
    {#each pasos as paso, i}
      <label class="paso"><input type="checkbox" bind:checked={marcados[i]} /> <span>{paso}</span></label>
    {/each}
  </fieldset>
  <div class="acciones">
    <button type="button" class="boton" onclick={copiar}>Copiar mi lista</button>
    <span class="estado" role="status" aria-live="polite">{estado}</span>
  </div>
</div>

<style>
  .interaccion { border: 2.5px solid var(--outline); border-radius: calc(var(--r-card) * 0.7); padding: var(--s-4); margin: var(--s-4) 0 0; background: var(--surface); }
  .interaccion__etiqueta { font-weight: 700; color: var(--fg); }
  .pasos { border: 0; margin: var(--s-3) 0; padding: 0; display: flex; flex-wrap: wrap; gap: var(--s-2); }
  .paso {
    display: inline-flex; align-items: center; gap: var(--s-2); min-height: 44px;
    padding: 0 var(--s-3); border: 1.5px solid var(--outline); border-radius: 999px; cursor: pointer;
    max-width: 100%;
  }
  .paso:has(input:checked) { background: var(--menta); color: var(--on-color); }
  .paso input { width: 1.25rem; height: 1.25rem; accent-color: var(--tinta); flex: none; }
  .acciones { display: flex; flex-wrap: wrap; align-items: center; gap: var(--s-2) var(--s-3); }
  .estado { font-size: var(--t-small); color: var(--muted); }
</style>
