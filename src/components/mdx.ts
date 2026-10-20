// Componentes disponibles en cualquier .mdx sin importarlos.
// (Los gráficos interactivos de Svelte sí se importan en el .mdx, porque
//  necesitan "client:visible" para cargarse en el navegador.)
import Parada from './camino/Parada.astro';
import Afirmacion from './evidencia/Afirmacion.astro';
import Acordeon from './evidencia/Acordeon.astro';
import PullQuote from './editorial/PullQuote.astro';
import Llamada from './editorial/Llamada.astro';
import LecturaRapida from './editorial/LecturaRapida.astro';
import PublicacionX from './editorial/PublicacionX.astro';

export const componentesMdx = {
  Parada, Afirmacion, Acordeon, PullQuote, Llamada, LecturaRapida, PublicacionX,
};
