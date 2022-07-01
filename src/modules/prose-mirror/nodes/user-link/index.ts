import { NodeBuilder } from '@/modules/prose-mirror/services/node/builder/Node.builder';

const user_link = new NodeBuilder()
	.setName('user_link')
	.setTitle('Ссылка на пользователя')
	.setType({
		group: 'block',
		content: 'inline*',
		parseDOM: [{ tag: 'span.user-link' }],

		toDOM() {
			return [
				'span',
				{ class: 'user-link' },
				0,
			];
		},
	})
	.build();

export {
	user_link,
}
