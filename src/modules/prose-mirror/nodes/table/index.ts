import { NodeBuilder } from '@/modules/prose-mirror/services/node/builder/Node.builder';
import { TableStrategy } from '@/modules/prose-mirror/services/node/strategy/Table.strategy';

const table = new NodeBuilder()
	.setName('table')
	.setTitle('Таблица')
	.setType({
		group: 'block',
		content: 'tr*',
		parseDOM: [{ tag: 'table'}],

		toDOM() {
			return ['table'];
		},
	})
	.setPresets({ iconName: 'Hr' })
	.setStrategy(new TableStrategy())
	.build();

export {
	table,
}
