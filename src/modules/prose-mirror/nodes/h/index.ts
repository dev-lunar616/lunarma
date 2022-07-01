import { textblockTypeInputRule } from 'prosemirror-inputrules';

import { NodeBuilder } from '@/modules/prose-mirror/services/node/builder/Node.builder';

import type { NodeType } from 'prosemirror-model';

const h = new NodeBuilder()
	.setName('h')
	.setTitle('Заголовок')
	.setType({
		group: 'block',
		content: 'inline*',
		attrs: {
			level: {
				default: 1,
			},
		},
		parseDOM: [
			{ tag: 'h1', attrs: { level: 1 } },    
			{ tag: 'h2', attrs: { level: 2 } },
			{ tag: 'h3', attrs: { level: 3 } },
		],

		toDOM(node) {
			return [
				`h${node.attrs.level}`,
				0,
			];
		},
	})
	.setPresets([
		{
			attributes: {
				level: 1,
			},
			iconName: 'H1',
			input: {
				trigger: '#',
				rule: (type: NodeType) => textblockTypeInputRule(
					/^#\s/, 
					type, 
					{ level: 1 },
				),
			},
		},
		{
			attributes: {
				level: 2,
			},
			iconName: 'H2',
			input: {
				trigger: '##',
				rule: (type: NodeType) => textblockTypeInputRule(
					/^##\s/, 
					type, 
					{ level: 2 },
				),
			},
		},
		{
			attributes: {
				level: 3,
			},
			iconName: 'H3',
			input: {
				trigger: '###',
				rule: (type: NodeType) => textblockTypeInputRule(
					/^###\s/, 
					type, 
					{ level: 3 },
				),
			},
		},
	])
	.build();

export {
	h,
}
