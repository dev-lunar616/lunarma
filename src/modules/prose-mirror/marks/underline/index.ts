import { MarkBuilder } from '@/modules/prose-mirror/services/mark/builder/Mark.builder';

const underline = new MarkBuilder()
	.setName('underline')
	.setType({
		parseDOM: [
			{ tag: 'u' }, 
		],
		
		toDOM: () => ['u'],
	})
	.setMenuPreset({
		iconName: 'Underline',
	})
	.build();

export {
	underline,
}
