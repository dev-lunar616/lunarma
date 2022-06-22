import type { VueElement } from 'vue';
import type { layoutType } from '@/layouts/layouts.types';

declare module 'vue-router' {
	interface RouteMeta {
		layout?: layoutType;
		layoutComponent?: VueElement;
	}
}
