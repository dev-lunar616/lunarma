import type { EditorView } from 'prosemirror-view';
import type { NodeType } from 'prosemirror-model';

interface NodeStrategy {
	create: (type: NodeType, attributes?: object) => (view: EditorView) => void;
	remove: (type: NodeType, attributes?: object) => (view: EditorView) => void;
	toggle: (type: NodeType, attributes?: object) => (view: EditorView) => void;
	isEnabled: (type: NodeType, attributes?: object) => (view: EditorView) => boolean;
	isActive: (type: NodeType, attributes?: object) => (view: EditorView) => boolean;
}

export type {
	NodeStrategy,
}
