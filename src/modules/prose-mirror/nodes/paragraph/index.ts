import { NodeBuilder } from '@/modules/prose-mirror/services/node/builder/Node.builder'; 

import type { NodeView } from 'prosemirror-view';
import type { Node } from 'prosemirror-model';

const paragraph = new NodeBuilder()
	.setName('paragraph')
	.setTitle('Параграф')
	.setType({
		group: 'block',
		content: 'inline*',
		parseDOM: [{ tag: 'p' }],

		toDOM() {
			return ['p', 0];
		},
	})
	.setPresets({ iconName: 'Paragraph' })
	.setNodeView((node: Node): NodeView => {
		const p = document.createElement('p');
	
		if (node.content.size === 0) {
			p.classList.add('is-empty');
		}

		return {
			dom: p,
			contentDOM: p,

			update: (node: Node): boolean => {
				if (node.type.name !== 'paragraph') {
					return false;
				}

				node.content.size === 0
					? p.classList.add('is-empty')
					: p.classList.remove('is-empty');

				return true;
			},
		};
	})
	.build();

export {
	paragraph,
}
