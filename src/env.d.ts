/// <reference path="../.astro/types.d.ts" />

declare namespace App {
  interface Locals {
    /** Datos del artículo que se está renderizando: los usan las escenas del MDX. */
    articulo?: {
      data: import('astro:content').CollectionEntry<'articulos'>['data'];
      pilarId: string;
      criaturaPilar: 'pregunta' | 'sello' | 'ojo' | 'pila' | 'saltarin' | 'empujon' | 'doble';
    };
  }
}
