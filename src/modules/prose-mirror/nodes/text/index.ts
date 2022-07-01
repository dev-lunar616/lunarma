import { NodeBuilder } from '@/modules/prose-mirror/services/node/builder/Node.builder'; 

const text = new NodeBuilder()
	.setName('text')
	.setType({
		group: 'inline',
		inline: true,
	})
	.build();

export {
	text,
}
