<template>
	<div :class="[
		'input',
		{ 'has-error': error },
	]">
		<input 
			v-bind="$attrs" 
			:value="value" 
			class="input__element"
			@focus="isFocused = true"
			@blur="isFocused = false"
			@input="event => emits('input', (event.target as HTMLTextAreaElement).value)"
		/>
	
		<div class="input__bottom-line"></div>

		<div v-if="error" class="input__error">
			{{ error }}
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

defineProps({
	value: {
		type: String,
		default: '',
	},
	error: {
		type: String,
		default: '',
	},
});
const emits = defineEmits<{
	(event: 'input', value: string): void,
}>();

const isFocused = ref(false);
</script>

<style lang="sass" scoped>
.input__element
	padding: 4px 10px
	width: calc(100% - 20px)
	font-family: 'Inter'
	font-size: 16px
	font-weight: 400
	line-height: 16px
	color: $c-black-gray
	background-color: transparent
	border: none
	border-radius: 1px
	outline: none
	text-align: center

	&::placeholder
		color: #474751

.input__bottom-line
	height: 2px
	width: 100%
	background-color: $c-black-gray
	border-radius: 2px

	.has-error &
		background-color: red
</style>
