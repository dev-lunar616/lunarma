<template>
	<div class="prose-mirror-node-info">
		<Text inline>
			{{ editor?.lastUpdate }}
		</Text>

		<Hr design="light" />

		<div class="prose-mirror-node-info__current-node">
			<Title :level="4" inline>
				Элемент:
			</Title> <Text inline>
				{{ currentNode?.builded?.title || 'отсутствует' }}
			</Text>
		</div>

		<div class="prose-mirror-node-info__current-node">
			<Title :level="4" inline>
				Быстрое создание:
			</Title> <Text inline>
				{{ currentNode?.preset?.input?.trigger || 'отсутствует'  }}
			</Text>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { computed, toRaw } from 'vue';

import Hr from '@/ui/items/hr/Hr.vue';
import Title from '@/ui/items/title/Title.vue';
import Text from '@/ui/items/text/Text.vue';

import { NodeService } from '@/modules/prose-mirror/services/node/Node.service';

import nodes from '@/modules/prose-mirror/nodes/index';

import type { EditorService } from '@/modules/prose-mirror/services/editor/Editor.service';

const props = defineProps<{
	editor: EditorService;
	editorUpdateKey: number;
}>();

const currentNode: any = computed(() => {
	if (!props.editorUpdateKey) {
		return null;
	}
	
	const type = NodeService.getActive()(toRaw(props.editor).view).type;
	const builded = nodes.find(node => node.name === type.name);
	const preset = builded?.presets instanceof Array
		? builded.presets.find(loopPreset => (
			new NodeService(builded.name, loopPreset.attributes)
				.isActive()
				(toRaw(props.editor).view)
		))
		: builded?.presets;

	return {
		type,
		builded,
		preset,
	};
});
</script>

<style lang="sass" scoped>
.prose-mirror-node-info
	box-sizing: border-box
	display: flex
	flex-direction: column
	padding: 25px 15px
	height: max-content
	background-color: white
	border-radius: 4px
</style>
