import type { NodeSpec } from 'prosemirror-model';
import type { NodeBuilderItemPreset } from '@/modules/prose-mirror/services/node/builder/node.builder.interfaces';
import type { NodeStrategy } from '@/modules/prose-mirror/services/node/strategy/index.interfaces';

interface NodeMenuItem {
	name: string;
	type: NodeSpec;
	preset: NodeBuilderItemPreset;
	strategy?: NodeStrategy;
}

export type {
	NodeMenuItem,
}
