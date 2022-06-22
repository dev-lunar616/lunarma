<template>
	<div class="prose-mirror-menu">
		<ProseMirrorMarks 
			:editor="editor" 
			:editor-update-key="editorUpdateKey" 
		/>
		
		<ProseMirrorNodes 
			:editor="editor" 
			:editor-update-key="editorUpdateKey" 
		/>
	</div>
</template>

<script lang="ts" setup>
import ProseMirrorMarks from '@/modules/prose-mirror/components/tools/menu/marks/ProseMirrorMarks.vue';
import ProseMirrorNodes from '@/modules/prose-mirror/components/tools/menu/nodes/ProseMirrorNodes.vue';

import type { EditorService } from '@/modules/prose-mirror/services/editor/Editor.service';

defineProps<{
	editor: EditorService;
	editorUpdateKey: number;
}>();
</script>

<style lang="sass" scoped>
.prose-mirror-menu
	box-sizing: border-box
	position: fixed
	bottom: 0
	right: 0
	left: 0
	display: flex
	align-items: center
	justify-content: space-evenly
	height: 36px
	width: 100%
	background-color: white
	border-top: 1px solid #D9D9D9
</style>
