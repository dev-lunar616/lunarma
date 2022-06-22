import { MarkBuilder } from '@/modules/prose-mirror/services/mark/builder/Mark.builder';

const italic = new MarkBuilder()
	.setName('italic')
	.setType({
		parseDOM: [
			{ tag: 'i' }, 
		],
		
		toDOM: () => ['i'],
	})
	.setMenuPreset({
		iconName: 'Italic',
	})
	.build();

export {
	italic,
}
