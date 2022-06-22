import type { NodeType } from 'prosemirror-model';

interface SchemaNodes {
	paragraph: NodeType;
	hr: NodeType;
	video_player: NodeType;
	li: NodeType;
	ul: NodeType;
	ol: NodeType;
	table: NodeType;
}

export type {
	SchemaNodes
}
