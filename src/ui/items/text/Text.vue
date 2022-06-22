<template>
	<p :class="[
		'text',
		{ inline },
	]">
		<slot />
	</p>
</template>

<script lang="ts" setup>
defineProps<{
	inline?: boolean,
}>();
</script>

<style lang="sass" scoped>
.text
	margin: 0
	font-family: 'Inter'

.inline
	display: inline-block
</style>
