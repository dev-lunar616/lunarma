<template>
	<div v-if="userStore.user" class="user">
		<UserAvatar
			design="dark"
			size="large"
			:source="userStore.user.avatar"
			class="user__avatar"
		/>

		<Title :level="1" class="user__login">
			{{ userStore.user.name }}
		</Title>
	</div>
</template>

<script lang="ts" setup>
import Title from '@/ui/items/title/Title.vue';
import UserAvatar from '@/entities/user/components/avatar/UserAvatar.vue';

import { useUserStore } from '@/entities/user/user.store';

const userStore = useUserStore();
</script>

<style lang="sass" scoped>
.user__avatar
	margin: 75px auto 0 auto

.user__login
	margin-top: 15px
	text-align: center
</style>
