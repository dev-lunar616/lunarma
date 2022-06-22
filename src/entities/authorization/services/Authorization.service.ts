import type { User } from '@/entities/user/index.interfaces';

class AuthorizationService {
	async authorize(): Promise<User> {
		await new Promise(resolve => {
			window.setTimeout(() => resolve(true), 2000);
		});

		const mockUser: User = {
			id: 616,
			name: 'Никита',
			avatar: 'https://sun9-20.userapi.com/s/v1/if1/5aXpMYA6KVwKcxMz8_ivexnnY4Chk6XR-XCH4TG-kagTP8mpAZgAgJv0_nJVTs6UvJfx6VW5.jpg?size=960x960&quality=96&type=album',
		};

		return mockUser;
	}
}

export {
	AuthorizationService,
}
