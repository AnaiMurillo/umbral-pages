// Componentes disponibles en cualquier artículo .mdx sin importarlos.
// (Los gráficos interactivos de Svelte sí se importan en el .mdx, porque
//  necesitan "client:visible" para cargarse en el navegador.)
import Escena from './articulo/Escena.astro';
import QueSimula from './articulo/QueSimula.astro';
import Afirmacion from './evidencia/Afirmacion.astro';
import Acordeon from './evidencia/Acordeon.astro';
import PullQuote from './editorial/PullQuote.astro';
import Llamada from './editorial/Llamada.astro';
import LecturaRapida from './editorial/LecturaRapida.astro';
import PublicacionX from './editorial/PublicacionX.astro';

export const componentesMdx = {
  Escena, QueSimula, Afirmacion, Acordeon, PullQuote, Llamada, LecturaRapida, PublicacionX,
};
