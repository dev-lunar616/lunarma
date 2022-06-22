import { InputRule } from 'prosemirror-inputrules';

import { NodeBuilder } from '@/modules/prose-mirror/services/node/builder/Node.builder';
import { HrStrategy } from '@/modules/prose-mirror/services/node/strategy/Hr.strategy';

import type { NodeType } from 'prosemirror-model';

const hr = new NodeBuilder()
	.setName('hr')
	.setTitle('Горизонтальная линия')
	.setType({
		group: 'block',
		parseDOM: [{ tag: 'hr'}],

		toDOM() {
			return ['hr'];
		},
	})
	.setPresets({
		iconName: 'Hr',
		input: {
			trigger: '---',
			rule: (type: NodeType) => new InputRule(
				/^---\s/,
				(state, match, start, end) => {
					const { tr } = state;
		
					tr.replaceWith(
						start - 1,
						end,
						type.create(),
					);
		
					return tr;
				},
			),
		},
	})
	.setStrategy(new HrStrategy())
	.build();

export default hr;
