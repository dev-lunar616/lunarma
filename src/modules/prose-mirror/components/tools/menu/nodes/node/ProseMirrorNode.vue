<template>
	<IconButton
		v-if="nodeMenuItem.preset?.iconName"
		type="light-darkest"
		:name="nodeMenuItem.preset.iconName"
		:is-active="isActive"
		:class="[
			'prose-mirror-node',
			{ 'disabled': !isActive && !isEnabled },
		]"
		@click="toggle"
	/>
</template>

<script lang="ts" setup>
import { computed, toRaw } from 'vue';

import IconButton from '@/ui/items/icon-button/IconButton.vue';

import { NodeService } from '@/modules/prose-mirror/services/node/Node.service';

import type { EditorService } from '@/modules/prose-mirror/services/editor/Editor.service';
import type { NodeMenuItem } from '@/modules/prose-mirror/services/node/index.interfaces';

const props = defineProps<{
	editor: EditorService;
	editorUpdateKey: number;
	nodeMenuItem: NodeMenuItem,
}>();

const node = new NodeService(
	props.nodeMenuItem.name,
	props.nodeMenuItem.preset.attributes,
	props.nodeMenuItem.strategy,
);

const isActive = computed((): boolean => (
	Boolean(
		props.editorUpdateKey 
		&& node.isActive()(toRaw(props.editor).view)
	)
));

const isEnabled = computed((): boolean => (
	Boolean(
		props.editorUpdateKey
		&& (isActive.value 
		|| node.isEnabled()(toRaw(props.editor).view))
	)
));

const create = (): void => {
	node.create()(toRaw(props.editor).view);
	toRaw(props.editor).view.focus();
};

const toggle = (): void => {
	node.toggle()(toRaw(props.editor).view);
	toRaw(props.editor).view.focus();
};
</script>

<style lang="sass" scoped>
.prose-mirror-node
	&.disabled
		pointer-events: none
		opacity: .5
</style>
