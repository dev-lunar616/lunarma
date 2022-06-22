import type { Plugin } from 'prosemirror-state';
import type { NodeSpec, NodeType } from 'prosemirror-model';
import type { InputRule } from 'prosemirror-inputrules';
import type { NodeStrategy } from '@/modules/prose-mirror/services/node/strategy/index.interfaces';

interface NodeBuilderItem {
	name: string;
	type: NodeSpec;
	title?: string;
	presets?: NodeBuilderItemPreset | NodeBuilderItemPreset[];
	nodeView?: Function;
	plugin?: Plugin;
	strategy?: NodeStrategy;
}

interface NodeBuilderItemPreset {
	attributes?: object;
	iconName?: string;
	input?: {
		trigger: string;
		rule: (type: NodeType) => InputRule;
	};
}

export type {
	NodeBuilderItem,
	NodeBuilderItemPreset,
}
