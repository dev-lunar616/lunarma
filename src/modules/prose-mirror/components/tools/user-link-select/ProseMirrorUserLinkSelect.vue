<template>
	<div class="prose-mirror-user-link-select">
		{{ login || 'all' }}
	</div>
</template>

<script lang="ts" setup>
const props = defineProps<{
	login: string,
}>();
</script>

<style lang="sass" scoped>
.prose-mirror-user-link-select
	box-sizing: border-box
	position: absolute
	top: 50px
</style>
