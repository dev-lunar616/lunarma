<template>
	<component 
		:is="`h${level}`"
		:class="[
			`h${level}`,
			{ inline },
		]"
	>
		<slot />
	</component>
</template>

<script lang="ts" setup>
defineProps<{
	level: 1 | 2 | 3 | 4 | 5 | 6,
	inline?: boolean,
}>();
</script>

<style lang="sass" scoped>
.h1,
.h2,
.h3,
.h4,
.h5,
.h6
	box-sizing: border-box
	margin: 0
	padding: 0
	font-family: 'Inter'

.inline
	display: inline-block
</style>
