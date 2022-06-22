interface User {
	id: number;
	name: string;
	avatar: string;
}

interface UserStore {
	user: null | User;
}

export type {
	User,
	UserStore,
}
