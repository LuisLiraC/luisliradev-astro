import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://luislirac.github.io',
	base: '/luisliradev-astro'
	integrations: [mdx(), sitemap()],
});
