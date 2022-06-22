import type { EditorState, Selection } from 'prosemirror-state';
import type { Node, Mark } from 'prosemirror-model';
import type { SchemaNodes } from '@/modules/prose-mirror/schema/index.interfaces';

interface AdvancedEditorState extends EditorState {
	config: Record<string, unknown> & {
		schema: {
			nodes: SchemaNodes,
			text: (text: string, marks?: readonly Mark[]) => Node;
		};
	};
}

interface AdvancedSelection extends Selection {
	node?: Node;
}

export type {
	AdvancedEditorState,
	AdvancedSelection,
}
