import type { EditorView } from 'prosemirror-view';
import type { NodeType } from 'prosemirror-model';
import type { NodeStrategy } from '@/modules/prose-mirror/services/node/strategy/index.interfaces';
import type { AdvancedEditorState } from '@/modules/prose-mirror/index.interfaces';

class TableStrategy implements NodeStrategy {
	public toggle(type: NodeType, attributes: object = {}) {
		return (view: EditorView): void => {
			this.create(type, attributes)(view);
		};
	}

	public create(type: NodeType, attributes: object = {}) {
		return (view: EditorView): void => {
			const { state } = view;
			const tableType = (state as AdvancedEditorState).config.schema.nodes.table;
		};
	}

	public remove: (type: NodeType, attributes?: object | undefined) => (view: EditorView) => void;

	public isEnabled(type: NodeType, attributes: object = {}) {
		return (view: EditorView) => {
			return false;
		};
	}
	
	public isActive(type: NodeType, attributes: object = {}) {
		return (view: EditorView) => {
			return false;
		};
	}
}

export {
	TableStrategy,
}
