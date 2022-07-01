import { NodeBuilder } from '@/modules/prose-mirror/services/node/builder/Node.builder';

const td = new NodeBuilder()
	.setName('td')
	.setType({
		content: 'inline*',
		parseDOM: [{ tag: 'td' }],

		toDOM() {
			return ['td'];
		},
	})
	.build();

export {
	td,
}
