<template>
	<div class="prose-mirror-note-info">
		<UserAvatar
			v-if="userStore.user"
			design="dark"
			size="large"
			:source="userStore.user.avatar"
		/>

		<Input :value="'lunar616'" />
	</div>
</template>

<script lang="ts" setup>
import Input from '@/ui/items/input/Input.vue';
import UserAvatar from '@/entities/user/components/avatar/UserAvatar.vue';

import { useUserStore } from '@/entities/user/user.store';

const userStore = useUserStore();
</script>

<style lang="sass" scoped>
.prose-mirror-note-info
	box-sizing: border-box
	display: grid
	grid-template-columns: max-content 1fr
	grid-column-gap: 15px
	padding: 25px 15px
	height: max-content
	background-color: white
	border-radius: 4px
</style>
