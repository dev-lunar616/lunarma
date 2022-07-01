import { Plugin } from 'prosemirror-state';

import { NodeBuilder } from '@/modules/prose-mirror/services/node/builder/Node.builder';
import { ListStrategy } from '@/modules/prose-mirror/services/node/strategy/List.strategy';

import type { AdvancedEditorState } from '@/modules/prose-mirror/index.interfaces';

const ol = new NodeBuilder()
	.setName('ol')
	.setTitle('Нумерованный список')
	.setType({
		group: 'block',
		content: 'li+',
		attrs: {
			order: {
				default: 1,
			},
		},
		parseDOM: [
			{
				tag: 'ol', 
				getAttrs(node) {
					return {
						// @ts-ignore
						order: node.hasAttribute('start') 
							// @ts-ignore
							? +node.getAttribute('start')
							: 1,
					};
				},
			},
		],

		toDOM(node) {
			return node.attrs.order == 1 
				? ['ol', 0] 
				: ['ol', { start: node.attrs.order }, 0];
		}
	})
	.setPresets({ iconName: 'List' })
	.setStrategy(new ListStrategy())
	.setPlugin(new Plugin({
		props: {
			handleKeyDown(view, event) {
				const { state } = view;
				const resolved = state.doc.resolve(state.selection.$from.pos);
				const isBackspace = event.key === 'Backspace';
				const olType = (state as AdvancedEditorState).config.schema.nodes.ol;
				const isTopLevelEmptyLi = state.doc.nodeAt(
					resolved.pos - 2 >= 0 
						? resolved.pos - 2 
						: 0
				)?.type.name === olType.name;

				if (isBackspace && isTopLevelEmptyLi) {
					view.dispatch(state.tr.replace(
						resolved.pos - 2,
						// @ts-ignore
						resolved.pos - 2 + state.doc.nodeAt(resolved.pos - 2).parent.nodeSize,
					));

					return true;
				}

				return false;
			},
		}
	}))
	.build();

export {
	ol,
}
