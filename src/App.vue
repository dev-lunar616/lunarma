<template>
	<AppLayout>
		<RouterView />
	</AppLayout>
</template>

<script lang="ts" setup>
import { RouterView } from 'vue-router';

import AppLayout from '@/layouts/AppLayout.vue';
</script>

<style lang="sass">
@import '@/assets/styles/global.sass'
</style>
