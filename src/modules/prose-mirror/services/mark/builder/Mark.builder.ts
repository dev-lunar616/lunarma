import type { MarkSpec } from 'prosemirror-model';

import type { MarkBuilderMenuPreset } from '@/modules/prose-mirror/services/mark/builder/mark.builder.interfaces';

class MarkBuilder {
	public name: string;
	public type: MarkSpec;
	public menuPreset: MarkBuilderMenuPreset;
	
	public setName(name: string): this {
		this.name = name;
		return this;
	}
	
	public setType(type: MarkSpec): this {
		this.type = type;
		return this;
	}

	public setMenuPreset(preset: MarkBuilderMenuPreset): this {
		this.menuPreset = preset;
		return this;
	}

	public build(): this {
		return this;
	}
}

export {
	MarkBuilder,
}
