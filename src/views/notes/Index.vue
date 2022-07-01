<template>
	<div class="notes">
		<div class="notes__wrap">
			<div class="notes__left-side">
				<ProseMirrorNoteInfo />

				<!-- <ButtonCreateNote /> -->
			</div>
			
			<div class="notes__content">
				<div
					ref="editorTemplate"
					class="notes__editor"
				></div>

				<ProseMirrorUserLinkSelect 
					v-if="userLink.hasTrigger"
					:login="userLink.login"
				/>
			</div>
			
			<ProseMirrorNodeInfo 
				v-if="editor"
				:editor="editor"
				:editor-update-key="editorUpdateKey"
			/>
		</div>

		<ProseMirrorMenu 
			v-if="editor"
			:editor="editor" 
			:editor-update-key="editorUpdateKey"
		/>
	</div>
</template>

<script lang="ts" setup>
import {
	ref,
	computed,
	onMounted,
} from 'vue';

import ButtonCreateNote from '@/entities/notes/components/ui/button-create-note/index.vue';
import ProseMirrorNoteInfo from '@/modules/prose-mirror/components/tools/note-info/ProseMirrorNoteInfo.vue';
import ProseMirrorNodeInfo from '@/modules/prose-mirror/components/tools/node-info/ProseMirrorNodeInfo.vue';
import ProseMirrorMenu from '@/modules/prose-mirror/components/tools/menu/ProseMirrorMenu.vue';
import ProseMirrorUserLinkSelect from '@/modules/prose-mirror/components/tools/user-link-select/ProseMirrorUserLinkSelect.vue';

import { EditorService } from '@/modules/prose-mirror/services/editor/Editor.service';
import { DataBaseService } from '@/services/data-base/DataBase.service';
import { UserLinkStrategy } from '@/modules/prose-mirror/services/node/strategy/UserLink.strategy'

import 'prosemirror-view/style/prosemirror.css';
import 'plyr/dist/plyr.css';

import type { EditorView } from 'prosemirror-view';

const editorTemplate = ref();
const editor = ref();
const editorUpdateKey = computed(() => editor.value?.key);
const userLink = ref({
	hasTrigger: false,
	login: '',
});

onMounted(async () => {
	const dataBaseNotes = await DataBaseService.getDataBase('notes', 1);
	const transaction = dataBaseNotes.transaction('notes');
	const store = transaction.objectStore('notes');

	const request = await store.get(1);
	request.onsuccess = () => {
		editor.value = new EditorService({
			target: editorTemplate.value,
			initialData: request.result,
			update: ({
				stateJSON,
				view,
			}: {
				stateJSON: JSON,
				view: EditorView
			}) => {
				const transaction = dataBaseNotes.transaction('notes', 'readwrite');
				const store = transaction.objectStore('notes');

				store.put({
					id: 1,
					note: stateJSON,
				});

				userLink.value = UserLinkStrategy.check()(view);
			},
		});
	};
});
</script>

<style lang="sass">
.ProseMirror
	box-sizing: border-box
	font-family: 'Inter'
	font-size: 16px
	font-weight: 400
	line-height: 16px
	outline: none

	--plyr-color-main: #24272C
	--plyr-video-background: #FBFBFD

	.button
		padding: 0 24px
		height: 37px
		font-family: 'Inter'
		font-size: 16px
		font-weight: 400
		line-height: 16px
		color: $c-ghostly-white
		background-color: $c-red-sea
		border-radius: 4px
		border: none
		outline: none
		cursor: pointer

	.youtube-link
		display: flex
		flex-direction: column
		align-items: center
		padding: 8px 12px
		color: $c-ghostly-white
		background-color: $c-black-gray
		border-radius: 4px

	.youtube-link__logo
		margin-bottom: 8px

	.youtube-link__wrapper
		display: grid
		grid-template-columns: 1fr max-content
		grid-column-gap: 10px
		width: 100%
		overflow: hidden

	.youtube-link__link
		overflow: hidden

	.file__input
		width: attr(data-counter px)

	.user-link
		padding: 0 4px
		color: $c-red-sea
		font-size: 16px
		font-weight: 600
		background-color: $c-ghostly-white
		border-radius: 4px

.files-widget
	height: 20px
	width: 20px
	background-color: red

.ProseMirror-selectednode
	outline: 2px solid $c-red-sea
</style>

<style lang="sass" scoped>
.notes
	box-sizing: border-box
	display: grid
	padding: 10px 10px 46px 10px
	width: 100%
	overflow: hidden

.notes__left-side
	display: flex
	flex-direction: column
	justify-content: space-between

.notes__wrap
	box-sizing: border-box
	display: grid
	grid-template-columns: minmax(350px, 1fr) 5fr minmax(350px, 1fr)
	column-gap: 25px
	overflow: hidden

.notes__content
	display: grid
	overflow: hidden

.notes__editor
	box-sizing: border-box
	margin: 0 auto
	padding: 25px 15px
	width: 100%
	background-color: white
	overflow-y: auto
</style>

