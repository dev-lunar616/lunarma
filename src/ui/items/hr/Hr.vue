<template>
	<hr :class="[
		'hr',
		`${design}`,
	]" />
</template>

<script lang="ts" setup>
defineProps<{
	design: 'light' | 'dark',
}>();
</script>

<style lang="sass" scoped>
.hr
	height: 1px
	width: 100%
	border: none
	border-radius: 4px

	&.light
		background-color: $c-ghostly-white
</style>
