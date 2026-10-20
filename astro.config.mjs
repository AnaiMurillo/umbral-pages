// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import svelte from '@astrojs/svelte';

// Sitio 100 % estático: Cloudflare sirve la carpeta dist/ sin código de servidor.
export default defineConfig({
  integrations: [mdx(), svelte()],
  trailingSlash: 'ignore',
});
