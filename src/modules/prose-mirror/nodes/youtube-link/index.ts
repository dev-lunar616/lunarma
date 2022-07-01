import { Plugin } from 'prosemirror-state';

import YouTube from '@/assets/svg/index/YouTube.svg?raw';

import { NodeBuilder } from '@/modules/prose-mirror/services/node/builder/Node.builder';

import type { EditorView, NodeView } from 'prosemirror-view';
import type { Node } from 'prosemirror-model';

import type { AdvancedEditorState } from '@/modules/prose-mirror/index.interfaces';

const handlerButtonAddClick = (
	view: EditorView, 
	position: number, 
	node: Node, 
	nodePosition: number,
	event: MouseEvent,
): boolean => {
	// @ts-ignore
	if (event.target.classList.contains('youtube-link__button')) {
		const isYouTubeLink = node.type.name === 'youtube_link';

		if (!isYouTubeLink) {
			return false;
		}

		const { state } = view;
		const resolved = state.doc.resolve(position);
		const videoPlayerType = (state as AdvancedEditorState).config.schema.nodes.video_player;
		const videoPlayer = videoPlayerType.createAndFill();
		const transaction = state.tr;

		if (videoPlayer) {
			transaction.replaceWith(
				resolved.before(),
				resolved.after(),
				videoPlayer,
			)
	
			view.dispatch(transaction);
		}
		
		return true;
	}

	return false;
};

const youtube_link = new NodeBuilder()
	.setName('youtube_link')
	.setTitle('Ссылка на ютуб')
	.setType({
		group: 'block',
		content: 'inline*',
		marks: '',
		defining: false,
		parseDOM: [{ tag: 'div.youtube-link' }],

		toDOM() {
			return [
				'div',
				{ class: 'youtube-link' },
				0,
			];
		},
	})
	.setPresets({ iconName: 'YouTube' })
	.setNodeView((): NodeView => {
		const dom = document.createElement('div');
		dom.classList.add('youtube-link');
	
		const logo = document.createElement('div');
		logo.innerHTML = YouTube;
		logo.setAttribute('contentEditable', 'false');
		logo.classList.add('youtube-link__logo');
	
		const wrapper = document.createElement('div');
		wrapper.classList.add('youtube-link__wrapper');
	
		const contentDOM = document.createElement('div');
		contentDOM.classList.add('youtube-link__link');
	
		const button = document.createElement('button');
		button.innerText = 'Добавить';
		button.setAttribute('contentEditable', 'false');
		button.classList.add('button');
		button.classList.add('youtube-link__button');
	
		dom.appendChild(logo);
		dom.appendChild(wrapper);
		wrapper.appendChild(contentDOM);
		wrapper.appendChild(button);
	
		return {
			dom,
			contentDOM,

			update: () => false,
		};
	})
	.setPlugin(new Plugin({
		props: {
			handleKeyDown(view, event): boolean {
				const { state } = view;
				const isEnter = event.key === 'Enter';
				const isYouTubeLink = state.selection.$anchor.parent.type.name === 'youtube_link';

				if (isEnter && isYouTubeLink) {
					const resolved = state.doc.resolve(state.selection.from);
					const videoPlayerType = (state as AdvancedEditorState).config.schema.nodes.video_player;
					const videoPlayer = videoPlayerType.createAndFill();
					const transaction = state.tr;

					if (videoPlayer) {
						transaction.replaceWith(
							resolved.before(),
							resolved.after(),
							videoPlayer,
						);
	
						view.dispatch(transaction);
					}


					return true;
				}

				return false;
			},

			handleClickOn(
				view: EditorView, 
				position: number, 
				node: Node, 
				nodePosition: number, 
				event: MouseEvent,
			) {			
				return handlerButtonAddClick(view, position, node, nodePosition, event);
			},
			handleDoubleClickOn(
				view: EditorView, 
				position: number, 
				node: Node, 
				nodePosition: number, 
				event: MouseEvent,
			): boolean {
				return handlerButtonAddClick(view, position, node, nodePosition, event);
			},
			handleTripleClickOn(
				view: EditorView, 
				position: number, 
				node: Node, 
				nodePosition: number, 
				event: MouseEvent,
			): boolean {
				return handlerButtonAddClick(view, position, node, nodePosition, event);
			},
		},
	}))
	.build();

export {
	youtube_link
};
