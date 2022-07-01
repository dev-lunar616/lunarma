import { Plugin } from 'prosemirror-state';

import { NodeBuilder } from '@/modules/prose-mirror/services/node/builder/Node.builder';
import { ListStrategy } from '@/modules/prose-mirror/services/node/strategy/List.strategy';

import type { AdvancedEditorState } from '@/modules/prose-mirror/index.interfaces';

const ul = new NodeBuilder()
	.setName('ul')
	.setTitle('Маркированный список')
	.setType({
		group: 'block',
		content: 'li+',
		parseDOM: [{ tag: 'ul' }],

		toDOM() {
			return ['ul', 0];
		},
	})
	.setPresets({ iconName: 'List' })
	.setStrategy(new ListStrategy())
	.setPlugin(new Plugin({
		props: {
			handleKeyDown(view, event) {
				const { state } = view;
				const resolved = state.doc.resolve(state.selection.$from.pos);
				const isBackspace = event.key === 'Backspace';
				const ulType = (state as AdvancedEditorState).config.schema.nodes.ul;
				const isTopLevelEmptyLi = state.doc.nodeAt(
					resolved.pos - 2 >= 0 
						? resolved.pos - 2 
						: 0,
				)?.type.name === ulType.name;

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
	ul,
}
