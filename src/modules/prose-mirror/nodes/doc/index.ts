import { NodeBuilder } from '@/modules/prose-mirror/services/node/builder/Node.builder'; 

const doc = new NodeBuilder()
	.setName('doc')
	.setType({ content: 'block+' })
	.build();

export {
	doc,
}
