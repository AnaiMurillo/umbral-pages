# Umbral

Plataforma de investigación en Behavioral HCI y Human-Centered AI para Latinoamérica, hecha de artículos interactivos.

Sitio estático con **Astro** y componentes interactivos en **Svelte**. El camino grueso y el Inicio usan **GSAP ScrollTrigger**; la parada activa, **Scrollama**; lo demás, CSS. Fuentes locales (Bricolage Grotesque y Questrial). Diseño: `docs/DESIGN.md`. Accesibilidad: `docs/ACCESIBILIDAD.md`. Se publica en **Cloudflare Workers** (archivos estáticos).

## Editar contenido (sin tocar código)

Documentos de referencia en `docs/`: `DESIGN.md` (diseño, manda), `GUIA_INTERFAZ_Y_CONTENIDO.md` y `TEXTOS_FINALES.md`.

| Qué | Dónde |
| --- | --- |
| Correo y **LinkedIn** (vacío = botón oculto) | `src/data/sitio.ts` |
| Los 5 pilares: pregunta, frase, qué explora, situaciones, en el radar, glosario, vacíos | `src/content/pilares.json` |
| Artículos (un `.mdx` por artículo; el nombre del archivo es la URL `/articulos/nombre`) | `src/content/articulos/` |
| Briefs (un `.md` por brief) | `src/content/investigacion/` |

**Crear un artículo:** copia `src/content/articulos/ejemplo.mdx`, cámbiale el nombre, pon `ejemplo: false` y reemplaza los campos del frontmatter (guía §3.4) y las escenas:

```mdx
<Escena n={1}>Para empezar (máx. 60 palabras)</Escena>
<Escena n={2}>Pruébalo tú: una interacción + <QueSimula>…</QueSimula></Escena>
<Escena n={3}>El hallazgo: 2 o 3 frases (la frase destacada sale de hallazgoUnaFrase)</Escena>
<Escena n={4}>La evidencia (el caso de la región y lo que complica salen del frontmatter)</Escena>
```

La escena 5 (Qué hacer con esto) y el cierre se arman solos desde el frontmatter. Otros componentes: `<Afirmacion fuente="id">`, `<PullQuote>`, `<Acordeon>`, `<Llamada>`, `<PublicacionX>`.

El artículo de ejemplo (`ejemplo: true`) no aparece en catálogos ni buscadores. Bórralo cuando publiques el primero real.

## Trabajar en local

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # genera dist/
npm run preview    # sirve dist/ como en producción
```

Versión estática de cualquier página: agrega `?estatico=1` a la URL (`?estatico=0` para volver).

## Publicación (Cloudflare)

- Configuración: `wrangler.jsonc` (Workers con archivos estáticos, carpeta `dist/`). Wrangler ejecuta `npm run build` antes de publicar.
- Versión de Node: `.node-version` (Astro 7 exige 22.22 o superior).
- Con el repositorio conectado en **Workers Builds**:
  - cada push a `main` publica producción;
  - cada otra rama o pull request crea una **vista previa** con su propia URL.
- Ajustes del proyecto en Cloudflare: comando de build `npm run build`, comando de deploy `npx wrangler deploy`, y para las ramas que no son de producción `npx wrangler preview`.

## Pendientes

- LinkedIn configurado en `src/data/sitio.ts`.
