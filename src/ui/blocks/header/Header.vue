<template>
	<div class="header">
		<div class="header__wrap">
			<div class="header__section side">

			</div>

			<div class="header__section">
				<RouterLink 
					:to="{ name: 'home' }"
					class="header__link-home"
				>
					L
				</RouterLink>

				<Hr 
					direction="vertical" 
					design="light"
					class="header__section-hr"
				/>

				<RouterLink
					v-if="userStore.user"
					:to="{ name: 'user' }"
				>
					<UserAvatar 
						design="light"
						size="medium"
						:source="userStore.user.avatar"
					/>
				</RouterLink>

				<RouterLink
					v-else
					:to="{ name: 'sign-in' }"
					class="header__link-sign-in"
				>
					<Icon name="User" />
				</RouterLink>
			</div>

			<div class="header__section side">
				<RouterLink 
					:to="{ name: 'notes' }"
					class="header__link-notes"
				>
					<Icon
						name="Notes"
						is-clickable
					/>
				</RouterLink>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import Icon from '@/ui/items/icon/Icon.vue';
import Hr from '@/ui/items/hr/Hr.vue';
import UserAvatar from '@/entities/user/components/avatar/UserAvatar.vue';

import { useUserStore } from '@/entities/user/user.store';

const userStore = useUserStore();
</script>

<style lang="sass" scoped>
.header
	box-sizing: border-box
	padding: 0 20px
	height: 46px
	width: 100%
	background-color: $c-black-gray

.header__wrap
	box-sizing: border-box
	display: grid
	grid-template-columns: 1fr max-content 1fr
	column-gap: 20px
	align-items: center
	margin: 0 auto
	height: 100%
	max-width: 1440px

.header__section
	display: flex
	align-items: center
	column-gap: 13px

	&.side
		justify-content: flex-start

.header__section-hr
	height: 13px

.header__link-notes,
.header__link-home
	display: flex
	color: $c-ghostly-white
	text-decoration: none

.header__link-sign-in
	display: flex
</style>
