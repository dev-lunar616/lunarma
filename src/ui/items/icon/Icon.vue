<template>
	<component 
		:is="icons[name]" 
		:class="[
			'icon',
			`${type}`,
		]" 
	/>
</template>

<script lang="ts" setup>
import User from '@/assets/svg/icons/User.svg?component';
import Notes from '@/assets/svg/icons/Notes.svg?component';
import Loading from '@/assets/svg/icons/Loading.svg?component';
import Bold from '@/assets/svg/icons/Bold.svg?component';
import Italic from '@/assets/svg/icons/Italic.svg?component';
import Underline from '@/assets/svg/icons/Underline.svg?component';
import Stroke from '@/assets/svg/icons/Stroke.svg?component';
import Paragraph from '@/assets/svg/icons/Paragraph.svg?component';
import H1 from '@/assets/svg/icons/H1.svg?component';
import H2 from '@/assets/svg/icons/H2.svg?component';
import H3 from '@/assets/svg/icons/H3.svg?component';
import Hr from '@/assets/svg/icons/Hr.svg?component';
import YouTube from '@/assets/svg/icons/YouTube.svg?component';
import List from '@/assets/svg/icons/List.svg?component';

import type {
	FunctionalComponent,
	SVGAttributes,
} from 'vue';

defineProps({
	name: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		default: 'light',
	},
});

const icons: Record<string, FunctionalComponent<SVGAttributes>> = {
	User,
	Notes,
	Loading,
	Bold,
	Italic,
	Underline,
	Stroke,
	Paragraph,
	H1,
	H2,
	H3,
	Hr,
	YouTube,
	List,
};
</script>

<style lang="sass" scoped>
.icon
	fill: $c-ghostly-white

	&.light
		fill: $c-ghostly-white

	&.light-darkest
		fill: $c-black-gray
</style>
