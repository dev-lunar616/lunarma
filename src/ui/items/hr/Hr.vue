<template>
	<hr :class="[
		'hr',
		`${design}`,
		`${direction}`,
	]" />
</template>

<script lang="ts" setup>
defineProps<{
	design: 'light' | 'dark',
	direction: 'horizontal' | 'vertical',
}>();
</script>

<style lang="sass" scoped>
.hr
	border: none
	border-radius: 4px

	&.horizontal
		height: 1px
		width: 100%

	&.vertical
		width: 1px

	&.light
		background-color: $c-ghostly-white
</style>
