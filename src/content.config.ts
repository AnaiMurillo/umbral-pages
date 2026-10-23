import { defineCollection, reference } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

// ----------------------------------------------------------
// Pilares: src/content/pilares.json (TEXTOS_FINALES.md §3 y §4).
// Las listas vacías ocultan su bloque en la página del pilar.
// ----------------------------------------------------------
const pilares = defineCollection({
  loader: file('./src/content/pilares.json'),
  schema: z.object({
    orden: z.number(),
    numero: z.string(),
    nombre: z.string(),
    color: z.enum(['celeste-v', 'rosa-v', 'mantequilla', 'menta', 'coral']),
    criatura: z.enum(['pregunta', 'sello', 'ojo', 'pila', 'saltarin', 'empujon', 'doble']),
    subtitulo: z.string(),
    frase: z.string(),
    pregunta: z.string(),
    queExplora: z.string(),
    situaciones: z.array(z.string()).default([]),
    enElRadar: z.array(z.string()).default([]),
    glosario: z.array(z.object({
      termino: z.string(),
      definicion: z.string(),
      fuente: z.string(),
      sinFuenteAcademica: z.boolean().default(false),
    })).default([]),
    vacios: z.array(z.string()).default([]),
  }),
});

const fuente = z.object({
  id: z.string(),
  titulo: z.string(),
  url: z.string().optional(),
  // Opcionales: los usa el modo evidencia y la lista de fuentes.
  autor: z.string().optional(),
  anio: z.union([z.number(), z.string()]).optional(),
  tipo: z.enum(['dato', 'paper', 'caso', 'comunicado', 'prensa']).default('paper'),
  latam: z.boolean().default(false),
});

// ----------------------------------------------------------
// Artículos: un .mdx por artículo en src/content/articulos/
// Frontmatter de GUIA_INTERFAZ_Y_CONTENIDO.md §3.4 (+ campos opcionales).
// ----------------------------------------------------------
const articulos = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/articulos' }),
  schema: z.object({
    titulo: z.string(),
    bajada: z.string(),
    pilar: reference('pilares'),
    mecanismo: z.string(),
    tipoInteraccion: z.enum(['decision-forzada', 'antes-y-despues', 'explorar-datos', 'simular-interfaz', 'predecir-antes-de-ver']),
    fecha: z.coerce.date(),
    actualizado: z.coerce.date(),
    tiempoLectura: z.number(),
    estado: z.enum(['publicado', 'en-preparacion']).default('publicado'),
    hallazgoUnaFrase: z.string(),
    casoLocal: z.object({ titulo: z.string(), fuente: z.string() }),
    matiz: z.object({ titulo: z.string(), fuente: z.string() }),
    briefSlug: z.string().optional(),
    fuentes: z.array(fuente).default([]),
    // Opcionales
    /** Artículo de ejemplo: aviso, sin indexar y fuera de catálogos (TEXTOS_FINALES §5.3). */
    ejemplo: z.boolean().default(false),
    /** Pregunta que responderá (tarjeta "En preparación"). */
    preguntaQueResponde: z.string().optional(),
    recomendaciones: z.object({
      producto: z.string(),
      usuarios: z.string(),
      investigacion: z.string(),
    }).optional(),
  }),
});

// ----------------------------------------------------------
// Briefs: un .md o .mdx por brief en src/content/investigacion/
// Cuerpo con las secciones: Contexto · Metodología · Evidencia · Problemas
// encontrados · Oportunidades · Recomendaciones · Fuentes.
// ----------------------------------------------------------
const investigacion = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/investigacion' }),
  schema: z.object({
    titulo: z.string(),
    pilar: reference('pilares'),
    mecanismo: z.string(),
    fecha: z.coerce.date(),
    actualizado: z.coerce.date(),
    tipoFuentes: z.string().default('Fuentes secundarias abiertas'),
    queEncontramos: z.string(),
    numFuentes: z.number(),
    articuloSlug: z.string().optional(),
    vacios: z.array(z.string()).default([]),
  }),
});

export const collections = { pilares, articulos, investigacion };
