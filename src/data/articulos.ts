// ==========================================================
// Qué artículos se ven y cómo se leen sus datos.
//
// Borradores: un artículo con estado "borrador" o "en-revision" se construye
// en local y en las vistas previas de Cloudflare (ramas que no son main), para
// poder revisarlo. En producción (rama main) no se construye ni se enlaza.
// Workers Builds expone la rama en WORKERS_CI_BRANCH. Si se compila en CI y
// la rama no se conoce, por seguridad los borradores no se publican.
// ==========================================================
import type { CollectionEntry } from 'astro:content';
import { tiposInteraccion } from './sitio';

type Articulo = CollectionEntry<'articulos'>;

const enCI = !!(process.env.WORKERS_CI || process.env.CI);
const rama = process.env.WORKERS_CI_BRANCH;
export const mostrarBorradores = enCI ? !!rama && rama !== 'main' : true;

export const esBorrador = (a: Articulo) => a.data.estado === 'borrador' || a.data.estado === 'en-revision';

/** Se construye su página. */
export const seConstruye = (a: Articulo) => !esBorrador(a) || mostrarBorradores;

/** Se lista como artículo legible (publicado, o borrador en vista previa). Nunca el de ejemplo. */
export const seLista = (a: Articulo) =>
  !a.data.ejemplo && (a.data.estado === 'publicado' || (esBorrador(a) && mostrarBorradores));

/** Familia de mecanismos (o mecanismo, en el formato anterior). */
export const familia = (a: Articulo['data']) => a.familiaDeMecanismos ?? a.mecanismo ?? '';

/** Lista de interacciones o tipos del artículo. */
export const tipos = (a: Articulo['data']) => (Array.isArray(a.tipoInteraccion) ? a.tipoInteraccion : [a.tipoInteraccion]);

export const nombreTipo = (t: string) => tiposInteraccion[t] ?? t;

export const textoInteracciones = (n: number) => `${n} ${n === 1 ? 'interacción' : 'interacciones'}`;
