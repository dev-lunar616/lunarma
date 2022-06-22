<template>
	<div class="prose-mirror-nodes">
		<ProseMirrorNode
			v-for="node in flatMenuNodes"
			:node-menu-item="node"
			:editor="editor"
			:editor-update-key="editorUpdateKey"
		/>
	</div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import ProseMirrorNode from '@/modules/prose-mirror/components/tools/menu/nodes/node/ProseMirrorNode.vue';

import nodes from '@/modules/prose-mirror/nodes/index';

import type { EditorService } from '@/modules/prose-mirror/services/editor/Editor.service';
import type { NodeMenuItem } from '@/modules/prose-mirror/services/node/index.interfaces';
import type { NodeBuilderItem } from '@/modules/prose-mirror/services/node/builder/node.builder.interfaces';

defineProps<{
	editor: EditorService;
	editorUpdateKey: number;
}>();

const flatMenuNodes = computed<NodeMenuItem[]>(() => {
	return nodes.reduce((result: NodeMenuItem[], node: NodeBuilderItem) => {
		if (node.presets instanceof Array) {
			node.presets.forEach(item => {
				result.push({
					...node,
					preset: item,
				});
			});
		} else if (node.presets) {
			result.push({
				...node,
				preset: node.presets,
			});
		}

		return result;
	}, [] as NodeMenuItem[]);
});
</script>

<style lang="sass" scoped>
.prose-mirror-nodes
	display: flex
	justify-content: center
	align-items: center
	column-gap: 5px
	height: 100%
</style>
