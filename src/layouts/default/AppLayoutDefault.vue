<template>
	<div class="default">
		<Header />

		<RouterView />
	</div>
</template>

<script lang="ts" setup>
import Header from '@/ui/blocks/header/Header.vue';
</script>

<style lang="sass">
.default
	box-sizing: border-box
	display: grid
	grid-template-rows: max-content 1fr
	height: 100%
	overflow: hidden
</style>
