<template>
	<div class="prose-mirror">
		<ProseMirrorNoteInfo />
		
		<div 
			ref="editorTemplate"
			class="prose-mirror__template"
		></div>
		
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
</template>

<script lang="ts" setup>
import {
	ref,
	computed,
	onMounted,
} from 'vue';

import ProseMirrorNoteInfo from '@/modules/prose-mirror/components/tools/note-info/ProseMirrorNoteInfo.vue';
import ProseMirrorNodeInfo from '@/modules/prose-mirror/components/tools/node-info/ProseMirrorNodeInfo.vue';
import ProseMirrorMenu from '@/modules/prose-mirror/components/tools/menu/ProseMirrorMenu.vue';

import { EditorService } from '@/modules/prose-mirror/services/editor/Editor.service';

import 'prosemirror-view/style/prosemirror.css';
import 'plyr/dist/plyr.css';

const props = defineProps<{
	initialData: any,
}>();

const emits = defineEmits<{
	(event: 'update', json: any): void,
}>();

const editorTemplate = ref();
const editor = ref();
const editorUpdateKey = computed(() => editor.value?.key);

onMounted(() => {
	editor.value = new EditorService({
		target: editorTemplate.value,
		initialData: props.initialData,
		update: (json: any) => emits('update', json),
	});
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
	

.files-widget
	height: 20px
	width: 20px
	background-color: red

.ProseMirror-selectednode
	outline: 2px solid $c-red-sea
</style>

<style lang="sass" scoped>
.prose-mirror
	box-sizing: border-box
	display: grid
	grid-template-columns: minmax(350px, 1fr) 5fr minmax(350px, 1fr)
	column-gap: 25px
	overflow: hidden

.prose-mirror__template
	box-sizing: border-box
	margin: 0 auto
	padding: 25px 15px
	width: 100%
	background-color: white
	overflow-y: auto
</style>
