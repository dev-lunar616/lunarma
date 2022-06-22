<template>
	<div class="prose-mirror-marks">
		<template v-for="mark in marks">
			<IconButton
				v-if="mark.menuPreset"
				type="light-darkest"
				:name="mark.menuPreset.iconName"
				:is-active="Boolean(editorUpdateKey && isActive(mark.name))"
				:class="[
					'prose-mirror-marks__mark',
					{ 'disabled': Boolean(editorUpdateKey && !isEnabled(mark.name)) },
				]"
				@click="toggle(mark.name)"
			/>
		</template>
	</div>
</template>

<script lang="ts" setup>
import { toRaw } from 'vue';

import IconButton from '@/ui/items/icon-button/IconButton.vue';

import { MarkService } from '@/modules/prose-mirror/services/mark/Mark.service';

import marks from '@/modules/prose-mirror/marks/index';

import type { EditorService } from '@/modules/prose-mirror/services/editor/Editor.service';

const { editor, editorUpdateKey } = defineProps<{
	editor: EditorService;
	editorUpdateKey: number;
}>();

const isEnabled = (markName: string): boolean => (
	MarkService.isEnabled
		(toRaw(editor).view.state.schema.marks[markName])
		(toRaw(editor).view)
);

const isActive = (markName: string): boolean => (
	MarkService.isMarked
		(toRaw(editor).view.state.schema.marks[markName])
		(toRaw(editor).view)
);

const toggle = (markName: string): void => {
	MarkService.toggle
		(toRaw(editor).view.state.schema.marks[markName])
		(toRaw(editor).view);
		
	toRaw(editor).view.focus();
};
</script>

<style lang="sass" scoped>
.prose-mirror-marks
	display: flex
	justify-content: center
	align-items: center
	column-gap: 5px
	height: 100%

.prose-mirror-marks__mark
	&.disabled
		pointer-events: none
		opacity: .5
</style>
