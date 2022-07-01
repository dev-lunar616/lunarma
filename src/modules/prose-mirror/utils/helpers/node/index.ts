import type { EditorView } from 'prosemirror-view';
import type { Node, NodeType, ResolvedPos } from 'prosemirror-model';
import type { FindedNodeData } from '@/modules/prose-mirror/utils/helpers/node/index.interfaces';

const findParentNodeClosestToPosition = (
	position: ResolvedPos, 
	predicate: (node: Node) => boolean = () => true,
): FindedNodeData | undefined => {
	for (let index = position.depth; index > 0; index--) {
		const node = position.node(index);
		
		if (predicate(node)) {
			return {
				position: index > 0 
					? position.before(index) 
					: 0,
				start: position.start(index),
				depth: index,
				node,
			};
		}
	}
};

const equalNodeType = (
	type: NodeType, 
	node: any,
): boolean => {
	return (
		(Array.isArray(type) && type.indexOf(node.type) > -1) 
		|| node.type === type
	);
};

const findParentNode = (
	predicate: (node: Node) => boolean = () => true,
): (view: EditorView) => FindedNodeData | undefined => {
	return (view: EditorView) => {
		const { state } = view;
		const resolvedFrom = state.doc.resolve(state.selection.$from.pos);
		
		return findParentNodeClosestToPosition(resolvedFrom, predicate);
	};
};

const findParentNodeOfType = (
	type: NodeType,
): (view: EditorView) => FindedNodeData | undefined => {
	return (view: EditorView) => (
		findParentNode((node: Node) => equalNodeType(type, node))(view)
	);
};

export {
	findParentNodeClosestToPosition,
	equalNodeType,
	findParentNode,
	findParentNodeOfType,
}
