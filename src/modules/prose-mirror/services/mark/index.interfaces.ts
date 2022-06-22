import type { NodeSpec } from 'prosemirror-model';
import type { MarkBuilderMenuPreset } from '@/modules/prose-mirror/services/mark/builder/mark.builder.interfaces';

interface MarkMenuItem {
	name: string;
	type: NodeSpec;
	menuPreset: MarkBuilderMenuPreset;
}

export type {
	MarkMenuItem,
}
