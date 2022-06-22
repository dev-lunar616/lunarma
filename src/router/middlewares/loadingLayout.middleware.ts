import type { RouteLocationNormalized } from 'vue-router';

import { layoutType, layoutMapComponents } from '@/layouts/layouts.types';

async function loadLayoutMiddleware(route: RouteLocationNormalized): Promise<void> {
	const { layout } = route.meta;
	const normalizedLayoutName = layout || layoutType.default;
	const fileName = layoutMapComponents[normalizedLayoutName];
	const fileNameWithoutExtension = fileName.split('.vue')[0];

	const component = await import(`../../layouts/${normalizedLayoutName}/${fileNameWithoutExtension}.vue`);
	route.meta.layoutComponent = component.default;
}

export {
	loadLayoutMiddleware,
};
