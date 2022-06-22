<template>
	<form class="authorization-sign-in-form">
		<Input
			placeholder="Логин"
			:value="signInForm.form.login.value.value"
			:error="signInForm.form.login.error.value"
			@input="setLogin"
		/>

		<Input
			type="password"
			placeholder="Пароль"
			:value="signInForm.form.password.value.value"
		/>

		<Button
			:is-loading="signIsLoading"
			class="authorization-sign-in-form__button-sign-in"
			@click.prevent="signInProxy"
		>
			Войти
		</Button>
	</form>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import Input from '@/ui/items/input/Input.vue';
import Button from '@/ui/items/button/Button.vue';

import { AuthorizationService } from '@/entities/authorization/services/Authorization.service';
import { FormService } from '@/services/form/Form.service';

import { useUserStore } from '@/entities/user/user.store';

const userStore = useUserStore();
const signInForm = new FormService({
	fields: ['login', 'password'],
	required: true,
});
signInForm.initialize({
	login: 'lunar616',
	password: '123',
})

const setLogin = (value: string) => {
	signInForm.form.login.value.value = value;
	signInForm.validate('login', FormService.validateEmail)
};

const signIsLoading = ref(false);
const signInProxy = async (): Promise<void> => {
	console.log('proxy start');
	signIsLoading.value = true;

	await new Promise(resolve => {
		window.setTimeout(() => resolve(true), 2000);
	});
	const user = await new AuthorizationService().authorize();
	userStore.setUser(user);

	signIsLoading.value = false;
	console.log('proxy end');

	console.log(userStore)
};
</script>

<style lang="sass" scoped>
.authorization-sign-in-form
	display: grid
	grid-auto-rows: max-content
	grid-row-gap: 10px
	width: 300px

.authorization-sign-in-form__button-sign-in
	margin-top: 15px
</style>
