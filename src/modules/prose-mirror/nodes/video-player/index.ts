import Plyr from 'plyr';

import { NodeBuilder } from '@/modules/prose-mirror/services/node/builder/Node.builder'; 

import type { NodeView } from 'prosemirror-view';
import type { Node } from 'prosemirror-model';

const video_player = new NodeBuilder()
	.setName('video_player')
	.setTitle('Плеер')
	.setType({
		group: 'block',
		atom: true,
		parseDOM: [{ tag: 'div.video-player' }],

		toDOM() {
			/**
			 * Полная структура описана в nodeView.
			 */
			return [
				'div',
				{ class: 'video-player' },
				0,
			];
		},
	})
	.setNodeView((node: Node): NodeView => {
		const dom = document.createElement('div');
		
		const iframe = document.createElement('iframe');
		iframe.classList.add('video-player');
		iframe.setAttribute('src', 'https://www.youtube.com/embed/CscRW9LlCnw');
		iframe.setAttribute('allowfullscreen', 'true');
		iframe.setAttribute('allowtransparency', 'true');
		
		dom.appendChild(iframe);
		
		new Plyr(dom);
		dom.classList.add('video-player');
		
		return {
			dom,
	
			update: (node: Node): boolean => {
				return false;
			},
		};
	})
	.build();

export {
	video_player,
}
