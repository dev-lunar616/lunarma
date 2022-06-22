import { MarkBuilder } from '@/modules/prose-mirror/services/mark/builder/Mark.builder';

const stroke = new MarkBuilder()
	.setName('stroke')
	.setType({
		parseDOM: [
			{ tag: 's' }, 
		],
		
		toDOM: () => ['s'],
	})
	.setMenuPreset({
		iconName: 'Stroke',
	})
	.build();

export {
	stroke,
}
