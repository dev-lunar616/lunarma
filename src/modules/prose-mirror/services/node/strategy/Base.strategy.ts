import { wrapIn, setBlockType } from 'prosemirror-commands';

import { findParentNodeClosestToPosition } from '@/modules/prose-mirror/utils/helpers/node';
import { areEquivalent } from '@/utils/object/areEquivalent';

import type { EditorView } from 'prosemirror-view';
import type { NodeType } from 'prosemirror-model';
import type { NodeStrategy } from '@/modules/prose-mirror/services/node/strategy/index.interfaces';
import type { AdvancedEditorState, AdvancedSelection } from '@/modules/prose-mirror/index.interfaces';

class BaseStrategy implements NodeStrategy {
	public create(type: NodeType, attributes: object = {}) {
		return (view: EditorView) => {
			const { state } = view;

			if (type.isTextblock) {
				setBlockType(type, attributes)(state, view.dispatch);
			} else {
				const { state } = view;
				const resolvedFrom = state.doc.resolve(state.selection.from);
				const parent = findParentNodeClosestToPosition(resolvedFrom);
				const newNode = type.createAndFill();

				if (parent?.node.nodeSize && newNode) {
					const transaction = state.tr;
					transaction.replaceWith(
						parent.position,
						parent.position + parent.node.nodeSize,
						newNode,
					);

					view.dispatch(transaction);
				}
			}
		};
	}

	public remove(type: NodeType, attributes: object = {}) {
		return (view: EditorView) => {
			const { state } = view;

			state.selection.empty
				|| (state.selection as AdvancedSelection).node 
					? this.removeIfSelectionEmpty()(view)
					: this.removeIfSelectionNotEmpty(type, attributes)(view);
		};
	}
	private removeIfSelectionEmpty(): (
		view: EditorView,
	) => void {
		return view => {
			const { state } = view;
			const defaultType = (state as AdvancedEditorState).config.schema.nodes.paragraph;
			const resolvedFrom = state.doc.resolve(state.selection.$from.pos);

			if (resolvedFrom.parent.isTextblock) {
				setBlockType(defaultType)(view.state, view.dispatch, view);
			} else {
				const resolvedTo = state.doc.resolve(state.selection.$to.pos);
				const transaction = state.tr;

				transaction.replaceWith(
					resolvedFrom.pos, 
					resolvedTo.pos,
					defaultType.create(),
				);
	
				view.dispatch(transaction);
			}
		};
	}
	private removeIfSelectionNotEmpty(
		type: NodeType,
		attributes: object = {},
	): (view: EditorView) => void {
		return view => {
			const { state } = view;
			const defaultType = (state as AdvancedEditorState).config.schema.nodes.paragraph;
			const resolvedFrom = state.doc.resolve(state.selection.$from.pos);
			const resolvedTo = state.doc.resolve(state.selection.$to.pos);
			const nodeFromData = findParentNodeClosestToPosition(resolvedFrom);
			const nodeToData = findParentNodeClosestToPosition(resolvedTo);
			const text = (state as AdvancedEditorState).config.schema.text;
			const transaction = state.tr;

			if (nodeFromData && nodeToData) {
				state.doc.nodesBetween(
					nodeFromData.start,
					nodeToData.start,
					(node, start) => {
						const isNecessaryType = node.type.name === type.name;
						const attributesAreEqual = areEquivalent(node.attrs, attributes);

						if (isNecessaryType && attributesAreEqual) {
							const resolvedNode = state.doc.resolve(start + 1);
							const node = findParentNodeClosestToPosition(resolvedNode);

							if (node) {
								transaction.replaceWith(
									transaction.mapping.map(node.position), 
									transaction.mapping.map(node.position) + node.node.nodeSize,
									defaultType.create(
										null,
										[text(node.node.textContent || ' ')],
									),
								);
							}
						}
					},
				);
			}

			view.dispatch(transaction);
		};
	}

	public toggle(type: NodeType, attributes: object = {}) {
		return (view: EditorView) => {
			this.isActive(type, attributes)(view)
				? this.remove(type, attributes)(view)
				: this.create(type, attributes)(view);
		};
	}

	public isEnabled(type: NodeType, attributes: object = {}) {
		return (view: EditorView) => {
			const { state } = view;

			return state.selection.empty || type.isTextblock
				? setBlockType(type, attributes)(view.state)
				: wrapIn(type, attributes)(view.state);
		};
	}

	public isActive(type: NodeType, attributes: object = {}) {
		return (view: EditorView) => {
			const { state } = view;
			const resolvedFrom = state.doc.resolve(state.selection.$from.pos);
			const resolvedTo = state.doc.resolve(state.selection.$to.pos);
			let isActive = false;

			state.doc.nodesBetween(
				resolvedFrom.pos,
				resolvedTo.pos,
				node => {
					const isNecessaryType = node.type.name === type.name;
					const attributesAreEqual = areEquivalent(node.attrs, attributes);

					if (isNecessaryType && attributesAreEqual) {
						isActive = true;

						return false;
					}
				},
			);

			return isActive;
		};
	}
}

export {
	BaseStrategy,
}
