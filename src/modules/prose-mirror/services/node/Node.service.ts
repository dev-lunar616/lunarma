import { BaseStrategy } from '@/modules/prose-mirror/services/node/strategy/Base.strategy';

import schema from '@/modules/prose-mirror/schema/index';

import type { EditorView } from 'prosemirror-view';
import type { Node, NodeType } from 'prosemirror-model';
import type { NodeStrategy } from '@/modules/prose-mirror/services/node/strategy/index.interfaces';

class NodeService implements NodeStrategy {
	public name: string;
	public type: NodeType;
	public attributes: object;
	private strategy: NodeStrategy;

	public constructor(
		name: string,
		attributes: object = {},
		strategy: NodeStrategy = new BaseStrategy(), 
	) {
		this.name = name;
		this.type = schema.nodes[name];
		this.attributes = attributes;
		this.strategy = strategy;
	}

	public static getActive(): (view: EditorView) => Node {
		return (view: EditorView): Node => (
			view.state.selection.hasOwnProperty('node')
				// @ts-ignore
				? view.state.selection.node
				: view.state.selection.$from.parent
		);
	}

	public create() {
		return (view: EditorView): void => {
			this.strategy.create(this.type, this.attributes)(view);
		};
	}

	public remove() {
		return (view: EditorView): void => {
			this.strategy.remove(this.type, this.attributes)(view);
		};
	}

	public toggle() {
		return (view: EditorView): void => {
			this.strategy.toggle(this.type, this.attributes)(view);
		};
	}

	public isEnabled() {
		return (view: EditorView): boolean => (
			this.strategy.isEnabled(this.type, this.attributes)(view)
		);
	}

	public isActive() {
		return (view: EditorView): boolean => (
			this.strategy.isActive(this.type, this.attributes)(view)
		);
	}
}

export {
	NodeService,
}
