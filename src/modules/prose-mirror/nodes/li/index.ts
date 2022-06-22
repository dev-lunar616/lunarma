import { Plugin, TextSelection } from 'prosemirror-state';

import { NodeBuilder } from '@/modules/prose-mirror/services/node/builder/Node.builder'; 

import { findParentNodeOfType } from '@/modules/prose-mirror/utils/helpers/node/index';

import type { AdvancedEditorState } from '@/modules/prose-mirror/index.interfaces';

const li = new NodeBuilder()
	.setName('li')
	.setType({
		content: 'inline*',
		defining: true,
		parseDOM: [{ tag: 'li' }],

		toDOM() {
			return [
				'li',
				0,
			];
		},
	})
	.setPlugin(new Plugin({
		props: {
			handleKeyDown(view, event): boolean {
				const { state } = view;
				const liType = (state as AdvancedEditorState).config.schema.nodes.li;
				const paragraph = (state as AdvancedEditorState).config.schema.nodes.paragraph;
				const li = findParentNodeOfType(liType)(view);
				const isEnter = event.key === 'Enter';

				if (isEnter && li) {
					const transaction = state.tr;

					transaction.replaceWith(
						li.position,
						li.position + li.node.nodeSize,
						paragraph.create(),
					);
					transaction.setSelection(TextSelection.create(
						view.state.doc, 
						li.position + 2,
					));

					view.dispatch(transaction);

					return true;
				}

				return false;
			},
		},
	}))
	.build();

export default li;
