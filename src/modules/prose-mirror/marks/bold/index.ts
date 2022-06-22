import { MarkBuilder } from '@/modules/prose-mirror/services/mark/builder/Mark.builder';

const bold = new MarkBuilder()
	.setName('bold')
	.setType({
		parseDOM: [
			{ tag: 'b' },
		],
		
		toDOM: () => ['b'],
	})
	.setMenuPreset({
		iconName: 'Bold',
	})
	.build();

export {
	bold,
}
