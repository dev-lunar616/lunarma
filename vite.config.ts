import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(), 
		svgLoader(),
	],

	css: {
		preprocessorOptions: {
			sass: {
				additionalData: '@import "./src/assets/styles/variables.sass"',
			},
		},
	},

	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
			'@prose-mirror': fileURLToPath(new URL('./src/modules/prose-mirror', import.meta.url)),
		},
	},
});
