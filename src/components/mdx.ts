// Componentes disponibles en cualquier .mdx sin necesidad de importarlos.
// (Los gráficos interactivos de Svelte sí se importan en el .mdx, porque
//  necesitan "client:visible" para cargarse en el navegador.)
import EscenaFija from './scroll/EscenaFija.astro';
import Paso from './scroll/Paso.astro';
import Afirmacion from './evidencia/Afirmacion.astro';
import Acordeon from './evidencia/Acordeon.astro';
import PullQuote from './editorial/PullQuote.astro';
import Llamada from './editorial/Llamada.astro';
import LecturaRapida from './editorial/LecturaRapida.astro';
import PublicacionX from './editorial/PublicacionX.astro';
import Revelacion from './editorial/Revelacion.astro';

export const componentesMdx = {
  EscenaFija, Paso, Afirmacion, Acordeon, PullQuote, Llamada, LecturaRapida, PublicacionX, Revelacion,
};
