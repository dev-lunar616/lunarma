import { createRouter, createWebHistory } from 'vue-router';

import { loadLayoutMiddleware } from '@/router/middlewares/loadingLayout.middleware';

import { layoutType } from '@/layouts/layouts.types';

import Home from '@/views/home/Index.vue';
import Notes from '@/views/notes/Index.vue';
import SignIn from '@/views/sign-in/Index.vue';
import User from '@/views/user/Index.vue';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home,
			meta: {
				layout: layoutType.default,
			},
		},
		{
			path: '/sign-in',
			name: 'sign-in',
			component: SignIn,
			meta: {
				layout: layoutType.default,
			},
		},
		{
			path: '/notes',
			name: 'notes',
			component: Notes,
			meta: {
				layout: layoutType.default,
			},
		},
		{
			path: '/user',
			name: 'user',
			component: User,
			meta: {
				layout: layoutType.default,
			},
		},
	],
});

router.beforeEach(loadLayoutMiddleware);

export default router;
