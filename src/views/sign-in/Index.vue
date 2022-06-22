<template>
	<div class="sign-in">
		<AuthorizationSignInForm />
	</div>
</template>

<script lang="ts" setup>
import AuthorizationSignInForm from '@/entities/authorization/components/forms/AuthorizarionSignInForm.vue';
</script>

<style lang="sass" scoped>
.sign-in
	display: flex
	justify-content: center
	align-items: center
	height: 100%
</style>
