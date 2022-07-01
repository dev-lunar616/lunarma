import type { MarkSpec } from 'prosemirror-model';

interface MarkBuilderItem {
	name: string;
	type: MarkSpec;
	menuPreset: MarkBuilderMenuPreset;
}

interface MarkBuilderMenuPreset {
	iconName: string;
}

export type {
	MarkBuilderItem,
	MarkBuilderMenuPreset,
}
