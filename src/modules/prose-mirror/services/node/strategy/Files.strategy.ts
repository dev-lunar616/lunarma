import { Decoration, DecorationSet } from 'prosemirror-view';
import { Plugin } from 'prosemirror-state';
import { NodeRange } from 'prosemirror-model';

import { BaseStrategy } from '@/modules/prose-mirror/services/node/strategy/Base.strategy';

import type { EditorView } from 'prosemirror-view';
import type { NodeType } from 'prosemirror-model';
import type { NodeStrategy } from '@/modules/prose-mirror/services/node/strategy/index.interfaces';
import type { AdvancedEditorState } from '@/modules/prose-mirror/index.interfaces';

const plugin = new Plugin({
	state: {
		init() {
			return DecorationSet.empty;
		},
		apply(transaction, set) {
			set = set.map(transaction.mapping, transaction.doc);

			// @ts-ignore
			const action = transaction.getMeta(this);

			const widget = document.createElement('div');
			widget.classList.add('files-widget');
			widget.contentEditable = 'false';

			if (action && action.add) {
				console.log(action.add.position, action.add.id)
				const decoration = Decoration.widget(
					action.add.position,
					widget,
					// @ts-ignore
					{ id: action.add.id },
				);
	
				set = set.add(transaction.doc, [decoration]);
			}

			return set;
		},
	},

	props: {
		decorations(state) { 
			// @ts-ignore
			return this.getState(state);
		},
	},
})

class FilesStrategy extends BaseStrategy implements NodeStrategy {
	public create(type: NodeType) {
		return (view: EditorView): void => {
			const { state } = view;
			const transaction = state.tr;

			if (!transaction.selection.empty) {
				transaction.deleteSelection();
			}

			transaction.setMeta(
				plugin, 
				{ 
					add: {
						id: {},
						position: transaction.selection.$from.pos
					}, 
				},
			);

			view.dispatch(transaction);
		};
	}

	public remove() {
		return (view: EditorView): void => {
			const { state } = view;
			const resolvedFrom = state.doc.resolve(state.selection.$from.pos);
			const resolvedTo = state.doc.resolve(state.selection.$to.pos);
			const defaultType = (state as AdvancedEditorState).config.schema.nodes.paragraph;
			const transaction = state.tr;

			transaction.replaceWith(
				resolvedFrom.pos, 
				resolvedTo.pos,
				defaultType.create(),
			)

			view.dispatch(transaction);
		};
	}

	public toggle(type: NodeType, attributes: object = {}) {
		return (view: EditorView): void => {
			this.create(type)(view);
		};
	}

	public isEnabled() {
		return (view: EditorView): boolean => {
			const { state } = view;
			const resolvedFrom = state.doc.resolve(state.selection.$from.pos);
			const resolvedTo = state.doc.resolve(state.selection.$to.pos);
			const range = new NodeRange(
				resolvedFrom, 
				resolvedTo, 
				resolvedFrom.depth,
			);

			return range.$from.pos === range.$to.pos;
		}
	}
}

export {
	plugin,
	FilesStrategy,
}
