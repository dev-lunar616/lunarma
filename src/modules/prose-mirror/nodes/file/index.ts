import { Plugin } from 'prosemirror-state';

import { NodeBuilder } from '@/modules/prose-mirror/services/node/builder/Node.builder';
import { FilesStrategy } from '@/modules/prose-mirror/services/node/strategy/Files.strategy';

import type { EditorView, NodeView } from 'prosemirror-view';

const counter = new Plugin({
	state: {
		init() {
			return 0;
		},
		apply(transaction, value) {
			return value + 1;
		},
	},
});

const file = new NodeBuilder()
	.setName('file')
	.setTitle('Файл')
	.setType({
		group: 'block',
		parseDOM: [
			{ tag: 'div.file' },    
		],

		toDOM() {
			return [
				'div',
				{ class: 'file' },
				0,
			];
		},
	})
	.setPresets([
		{
			iconName: 'H2',
		},
	])
	.setStrategy(new FilesStrategy())
	.setNodeView((node: Node, view: EditorView): NodeView => {
		const dom = document.createElement('div');
		dom.classList.add('file');
		
		const input = document.createElement('input');
		input.setAttribute('type', 'file');
		input.classList.add('file__input');
		input.classList.add('button');
		input.addEventListener('change', event => {
			const tr = view.state.tr;
			const interval = window.setInterval(() => {
				tr.setMeta('counter', (tr.getMeta('counter') || 0) + 10);
				if (input?.dataset) {
					input.dataset.counter = tr.getMeta('counter');

					if (tr.getMeta('counter') == 100) {
						window.clearInterval(interval);
					}
				}
			}, 1000);
		});
		
		dom.appendChild(input);
		
		return {
			dom,
	
			update: (): boolean => {
				console.log('update');
				return false;
			},
		};
	})
	.build();

export default file;
