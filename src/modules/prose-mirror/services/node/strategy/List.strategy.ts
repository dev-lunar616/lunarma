import {
	findParentNodeClosestToPosition,
	findParentNodeOfType,
} from '@/modules/prose-mirror/utils/helpers/node/index';
import { areEquivalent } from '@/utils/object/areEquivalent';

import type { EditorView } from 'prosemirror-view';
import type { Node, NodeType } from 'prosemirror-model';
import type { NodeStrategy } from '@/modules/prose-mirror/services/node/strategy/index.interfaces';
import type { AdvancedEditorState } from '@/modules/prose-mirror/index.interfaces';
import type { Transaction } from 'prosemirror-state';

class ListStrategy implements NodeStrategy {
	private hasOnlyOneListItem(node: any): boolean {
		return node?.content.content.length === 1;
	}

	public create(type: NodeType) {
		return (view: EditorView): void => {
			const { state } = view;

			state.selection.empty
				? this.createIfSelectionEmpty(type)(view)
				: this.createIfSelectionNotEmpty(type)(view);
		};
	}
	private createIfSelectionEmpty(
		type: NodeType,
	): (view: EditorView) => void {
		return (view: EditorView): void => {
			const { state } = view;
			const resolvedFrom = state.doc.resolve(state.selection.$from.pos);
			const parentFrom = findParentNodeOfType(resolvedFrom.parent.type)(view);
			const liType = (state as AdvancedEditorState).config.schema.nodes.li;

			if (parentFrom) {
				const lies: Node[] = [liType.create(
					null,
					[(state as AdvancedEditorState).config.schema.text(
						parentFrom.node.textContent || ' ',
					)],
				)];


				const ul = type.create(null, lies);
				const transaction = state.tr;

				transaction.replaceWith(
					parentFrom.position,
					parentFrom.position + parentFrom.node.nodeSize,
					ul,
				);
	
				view.dispatch(transaction);
			}
		};
	}
	private createIfSelectionNotEmpty(
		type: NodeType,
	): (view: EditorView) => void {
		return (view: EditorView): void => {
			const { state } = view;
			const resolvedFrom = state.doc.resolve(state.selection.$from.pos);
			const resolvedTo = state.doc.resolve(state.selection.$to.pos);
			const nodeFromData = findParentNodeClosestToPosition(resolvedFrom);
			const nodeToData = findParentNodeClosestToPosition(resolvedTo);
			const liType = (state as AdvancedEditorState).config.schema.nodes.li;
			const lies: Node[] = [];

			if (nodeFromData && nodeToData) {
				state.doc.nodesBetween(
					nodeFromData.position,
					nodeToData.position + nodeToData.node.nodeSize,
					node => {
						if (node.isText) {
							lies.push(liType.create(
								null,
								[(state as AdvancedEditorState).config.schema.text(node.textContent)],
							));
						}
					},
				);
	
				const ul = type.create(null, lies);
				const transaction = state.tr;
				// @TODO: @lunar616
				const testiruem = transaction.doc.nodeAt(nodeFromData.position - 1);
				let step = 0;

				if (['ul', 'ol'].includes(testiruem?.type.name || '')) {
					step = 2;
				}

				transaction.replaceWith(
					nodeFromData.position - step,
					nodeToData.position + nodeToData.node.nodeSize,
					ul,
				);
				
				view.dispatch(transaction);
			}
		};
	}

	public remove(type: NodeType, attributes: object = {}) {
		return (view: EditorView): void => {
			const { state } = view;

			state.selection.empty
				? this.removeIfSelectionEmpty(type)(view)
				: this.removeIfSelectionNotEmpty(type, attributes)(view);
		};
	}
	private removeIfSelectionEmpty(
		type: NodeType,
	): (view: EditorView) => void {
		return (view: EditorView): void => {
			const { state } = view;
			const resolved = state.doc.resolve(state.selection.$from.pos);
			const list = findParentNodeOfType(type)(view);
			const listItem = findParentNodeOfType(resolved.parent.type)(view);
			const paragraphType = (state as AdvancedEditorState).config.schema.nodes.paragraph;

			if (list) {
				const nodeForDeleting = this.hasOnlyOneListItem(list.node)
					? list
					: listItem;
	
				const paragraph = paragraphType.create(
					null,
					[(state as AdvancedEditorState).config.schema.text(
						listItem?.node.textContent || ' ',
					)],
				);
	
				if (nodeForDeleting) {
					const transaction = state.tr;

					transaction.replaceRangeWith(
						nodeForDeleting.position,
						nodeForDeleting.position + nodeForDeleting.node.nodeSize, 
						paragraph,
					);
		
					view.dispatch(transaction);
				}
			}
		};
	}
	private removeIfSelectionNotEmpty(
		type: NodeType,
		attributes: object = {},
	): (view: EditorView) => void {
		return (view: EditorView): void => {
			const { state } = view;
			const resolvedFrom = state.doc.resolve(state.selection.$from.pos);
			const resolvedTo = state.doc.resolve(state.selection.$to.pos);
			const nodeFromData = findParentNodeClosestToPosition(resolvedFrom);
			const nodeToData = findParentNodeClosestToPosition(resolvedTo);
			const nodesInsteadLi: any[] = [];
			const liType = (state as AdvancedEditorState).config.schema.nodes.li;
			const paragraphType = (state as AdvancedEditorState).config.schema.nodes.paragraph;
			const transaction = state.tr;

			if (nodeFromData && nodeToData) {
				transaction.doc.nodesBetween(
					nodeFromData.start,
					nodeToData.start,
					(node, start) => {
						const isNecessaryType = liType.name === node.type.name;
						const attributesAreEqual = areEquivalent(node.attrs, attributes);
	
						if (isNecessaryType && attributesAreEqual) {
							nodesInsteadLi.push({
								from: start,
								to: start + node.nodeSize,
								node: paragraphType.create(
									null,
									[(state as AdvancedEditorState).config.schema.text(
										node.textContent || ' ',
									)],
								),
							});
						}
					},
				);

				nodesInsteadLi.forEach(li => {
					transaction.replaceRangeWith(
						transaction.mapping.map(li.from - 1),
						transaction.mapping.map(li.to),
						li.node,
					);
				});

				state.doc.nodesBetween(
					nodeFromData.start,
					nodeToData.start,
					(node, start) => {
						const isNecessaryType = liType.name === node.type.name;
						const attributesAreEqual = areEquivalent(node.attrs, attributes);

						if (isNecessaryType && attributesAreEqual) {
							const resolvedStart = transaction.doc.resolve(transaction.mapping.map(start));
							const parentUl = findParentNodeClosestToPosition(
								resolvedStart, 
								node => node.type.name === type.name,
							);

							if (parentUl) {
								transaction.delete(
									Math.max(
										parentUl.position, 
										transaction.mapping.map(nodeFromData.start),
									),
									Math.min(
										parentUl.position + parentUl.node.nodeSize, 
										transaction.mapping.map(nodeToData.start),
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
		return (view: EditorView): void => {
			this.isActive(type)(view)
				? this.remove(type, attributes)(view)
				: this.create(type)(view);
		};
	}

	public isEnabled() {
		return (): boolean => true;
	}

	public isActive(type: NodeType) {
		return (view: EditorView) => {
			const { state } = view;
			const resolvedFrom = state.doc.resolve(state.selection.$from.pos);
			const resolvedTo = state.doc.resolve(state.selection.$to.pos);
			let isActive = false;

			state.doc.nodesBetween(
				resolvedFrom.pos,
				resolvedTo.pos,
				node => {
					if (node.type.name === type.name) {
						isActive = true;
					}
				},
			);

			return isActive;
		};
	}
}

export {
	ListStrategy,
}
