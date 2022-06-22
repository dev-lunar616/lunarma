import type { Plugin } from 'prosemirror-state';
import type { NodeSpec } from 'prosemirror-model';
import type { 
	NodeBuilderItem, 
	NodeBuilderItemPreset,
} from '@/modules/prose-mirror/services/node/builder/node.builder.interfaces';
import type { NodeStrategy } from '@/modules/prose-mirror/services/node/strategy/index.interfaces';

class NodeBuilder {
	private name: string;
	private title?: string;
	private type: NodeSpec;
	private presets?: NodeBuilderItemPreset | NodeBuilderItemPreset[];
	private nodeView?: Function;
	private plugin?: Plugin;
	private strategy?: NodeStrategy;
	
	public setName(name: string): this {
		this.name = name;
		return this;
	}

	public setTitle(title: string): this {
		this.title = title;
		return this;
	}

	public setType(type: NodeSpec): this {
		this.type = type;
		return this;
	}

	public setPresets(presets: NodeBuilderItemPreset): this;
	public setPresets(presets: NodeBuilderItemPreset[]): this;
	public setPresets(presets: NodeBuilderItemPreset | NodeBuilderItemPreset[]): this {
		this.presets = presets;
		return this;
	}

	public setNodeView(nodeView: Function): this {
		this.nodeView = nodeView;
		return this;
	}

	public setPlugin(plugin: Plugin): this {
		this.plugin = plugin;
		return this;
	}

	public setStrategy(strategy: NodeStrategy): this {
		this.strategy = strategy;
		return this;
	}

	public build(): NodeBuilderItem {
		const result: NodeBuilderItem = {
			name: this.name,
			type: this.type,
		};

		if (this.title) {
			result.title = this.title;
		}

		if (this.presets) {
			result.presets = this.presets;
		}

		if (this.nodeView) {
			result.nodeView = this.nodeView;
		}

		if (this.plugin) {
			result.plugin = this.plugin;
		}

		if (this.strategy) {
			result.strategy = this.strategy;
		}

		return result;
	}
}

export {
	NodeBuilder,
}
