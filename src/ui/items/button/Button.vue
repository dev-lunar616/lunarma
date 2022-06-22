<template>
	<button
		v-bind="$attrs"
		:disabled="isLoading"
		:class="[
			'button',
			{ 'is-loading': isLoading },
		]" 
	>
		<template v-if="isLoading">
			<Icon 
				name="Loading"
				class="button__icon-loading"
			/>
		</template>

		<template v-else>
			<slot />
		</template>
	</button>
</template>

<script lang="ts" setup>
import Icon from '@/ui/items/icon/Icon.vue';

defineProps({
	isLoading: {
		type: Boolean,
		default: false,
	},
});
</script>

<style lang="sass" scoped>
@keyframes loop
	0%
		transform: rotate(0deg)

	100%
		transform: rotate(360deg)

.button
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

.button__icon-loading
	animation: 1s linear 0s normal none infinite running loop
</style>
