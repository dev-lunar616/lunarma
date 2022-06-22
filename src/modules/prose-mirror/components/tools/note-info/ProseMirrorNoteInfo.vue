<template>
	<div class="prose-mirror-note-info">
		<UserAvatar
			v-if="userStore.user"
			design="dark"
			size="large"
			:source="userStore.user.avatar"
		/>
	</div>
</template>

<script lang="ts" setup>
import UserAvatar from '@/entities/user/components/avatar/UserAvatar.vue';

import { useUserStore } from '@/entities/user/user.store';

const userStore = useUserStore();
</script>

<style lang="sass" scoped>
.prose-mirror-note-info
	box-sizing: border-box
	display: flex
	flex-direction: column
	padding: 25px 15px
	height: max-content
	background-color: white
	border-radius: 4px
</style>
