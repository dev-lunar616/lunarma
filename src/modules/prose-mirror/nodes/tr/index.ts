import { NodeBuilder } from '@/modules/prose-mirror/services/node/builder/Node.builder';

const tr = new NodeBuilder()
	.setName('tr')
	.setType({
		content: 'inline*',
		parseDOM: [{ tag: 'tr' }],

		toDOM() {
			return ['tr', 0];
		},
	})
	.build();

export default tr;
