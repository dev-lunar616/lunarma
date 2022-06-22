import { defineStore } from 'pinia';

import type { User, UserStore } from '@/entities/user/index.interfaces';

const useUserStore = defineStore('user', {
	state: () => ({
		user: null,
	}) as UserStore,

	actions: {
		setUser(user: User): void {
			this.user = user;
		},
	},
});

export {
	useUserStore,
}
