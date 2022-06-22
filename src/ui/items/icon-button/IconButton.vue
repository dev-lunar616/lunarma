<template>
	<button
		v-bind="$attrs"
		:class="[
			'icon-button',
			{ 'is-active': isActive },
		]"
	>
		<Icon 
			:name="name"
			:type="type"
			class="icon-button__icon"
		/>
	</button>
</template>

<script lang="ts" setup>
import Icon from '@/ui/items/icon/Icon.vue';

defineProps({
	name: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		default: 'one',
	},
	isActive: {
		type: Boolean,
		default: false,
	},
});
</script>

<style lang="sass" scoped>
.icon-button
	display: flex
	padding: 2px
	height: max-content
	width: max-content
	background-color: transparent
	border: none
	border-radius: 4px
	transition: background-color .1s ease
	cursor: pointer

	&:hover,
	&.is-active
		background-color: $c-black-gray

.icon-button__icon
	transition: fill .1s ease

	.icon-button:hover &,
	.is-active &
		fill: $c-ghostly-white
</style>
