import type { NodeType } from 'prosemirror-model';

interface FindedNodeData {
	position: number;
	start: number;
	depth: number;
	node: Partial<NodeType> & { 
		nodeSize: number;
		textContent: string;
	};
}

export type {
	FindedNodeData,
}
