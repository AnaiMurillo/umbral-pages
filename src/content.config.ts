import { defineCollection, reference } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

// Los cinco pilares. Se editan en src/content/pilares.json
const pilares = defineCollection({
  loader: file('./src/content/pilares.json'),
  schema: z.object({
    nombre: z.string(),
    mecanismo: z.string(),
    teaser: z.string(),
    orden: z.number(),
  }),
});

const fuente = z.object({
  id: z.string(),
  titulo: z.string(),
  autor: z.string().optional(),
  anio: z.union([z.number(), z.string()]).optional(),
  tipo: z.enum(['dato', 'paper', 'caso', 'comunicado', 'prensa']).default('paper'),
  url: z.string().optional(),
  latam: z.boolean().default(false),
});

// Módulos explorables. Un archivo .mdx por módulo en src/content/modulos/
const modulos = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/modulos' }),
  schema: z.object({
    titulo: z.string(),
    bajada: z.string(),
    pregunta: z.string(),
    pilar: reference('pilares'),
    hallazgo: z.string(),
    teaser: z.string(),
    fecha: z.coerce.date(),
    ejemplo: z.boolean().default(false),
    color: z.enum(['celeste', 'rosa']).default('celeste'), // color del camino
    brief: z.string().optional(), // slug del research brief completo
    recomendaciones: z.array(z.string()).default([]),
    fuentes: z.array(fuente).default([]),
  }),
});

// Research briefs completos (lectura sobria, sin efectos).
const investigacion = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/investigacion' }),
  schema: z.object({
    titulo: z.string(),
    resumen: z.string(),
    pilar: reference('pilares'),
    fecha: z.coerce.date(),
    ejemplo: z.boolean().default(false),
  }),
});

export const collections = { pilares, modulos, investigacion };
