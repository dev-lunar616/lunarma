import { NodeRange } from 'prosemirror-model';

import { BaseStrategy } from '@/modules/prose-mirror/services/node/strategy/Base.strategy';

import { findParentNodeClosestToPosition } from '@/modules/prose-mirror/utils/helpers/node';
import { areEquivalent } from '@/utils/object/areEquivalent';

import type { EditorView } from 'prosemirror-view';
import type { NodeType } from 'prosemirror-model';
import type { NodeStrategy } from '@/modules/prose-mirror/services/node/strategy/index.interfaces';
import type { AdvancedEditorState, AdvancedSelection } from '@/modules/prose-mirror/index.interfaces';

class HrStrategy extends BaseStrategy implements NodeStrategy {
	public remove(type: NodeType, attributes: object = {}) {
		return (view: EditorView) => {
			const { state } = view;

			state.selection.empty
				|| (state.selection as AdvancedSelection).node 
					? this.removeHrIfSelectionEmpty()(view)
					: this.removeHrIfSelectionNotEmpty(type, attributes)(view);
		};
	}
	private removeHrIfSelectionEmpty(): (
		view: EditorView,
	) => void {
		return view => {
			const { state } = view;
			const resolvedFrom = state.doc.resolve(state.selection.$from.pos);
			const resolvedTo = state.doc.resolve(state.selection.$to.pos);
			const paragraph = (state as AdvancedEditorState).config.schema.nodes.paragraph;
			const transaction = state.tr;

			transaction.replaceWith(
				resolvedFrom.pos, 
				resolvedTo.pos,
				paragraph.create(),
			);

			view.dispatch(transaction);
		};
	}
	private removeHrIfSelectionNotEmpty(
		type: NodeType,
		attributes: object = {},
	): (view: EditorView) => void {
		return view => {
			const { state } = view;
			const resolvedFrom = state.doc.resolve(state.selection.$from.pos);
			const resolvedTo = state.doc.resolve(state.selection.$to.pos);
			const nodeFromData = findParentNodeClosestToPosition(resolvedFrom);
			const nodeToData = findParentNodeClosestToPosition(resolvedTo);
			const paragraphType = (state as AdvancedEditorState).config.schema.nodes.paragraph;
			const paragraph = paragraphType.create(
				null,
				[(state as AdvancedEditorState).config.schema.text(' ')],
			);
			const transaction = state.tr;

			if (nodeFromData && nodeToData) {
				transaction.doc.nodesBetween(
					nodeFromData.start,
					nodeToData.start,
					(node, start) => {
						const isNecessaryType = type.name === node.type.name;
						const attributesAreEqual = areEquivalent(node.attrs, attributes);
	
						if (isNecessaryType && attributesAreEqual) {
							transaction.replaceRangeWith(
								transaction.mapping.map(start),
								transaction.mapping.map(start + node.nodeSize),
								paragraph,
							);
						}
					},
				);
			}

			view.dispatch(transaction);
		};
	}
	
	public isEnabled() {
		return () => true;
	}
}

export {
	HrStrategy,
}
