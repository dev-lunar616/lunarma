<template>
	<div :class="[
		'user-avatar',
		`${design}`,
		`${size}`,
	]">
		<img
			:src="source"	
			alt="user-avatar"
			class="user-avatar__image"
		/>
	</div>
</template>

<script lang="ts" setup>
defineProps<{
	design: 'light' | 'dark',
	size: 'small' | 'medium' | 'large',
	source: string,
}>();
</script>

<style lang="sass" scoped>
.user-avatar
	border-radius: 50%
	border: 1px solid transparent
	overflow: hidden

	&.light
		border-color: $c-ghostly-white
		box-shadow: 0 0 4px rgba(255, 255, 255, .25)

	&.dark
		border-color: $c-black-gray
		box-shadow: 0 0 4px rgba(0, 0, 0, .25)

	&.small
		height: 20px
		width: 20px

	&.medium
		height: 25px
		width: 25px

	&.large
		height: 90px
		width: 90px
		border-width: 2px

.user-avatar__image
	display: block
	height: 100%
	width: 100%
</style>
