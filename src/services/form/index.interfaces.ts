import type { ShallowRef } from 'vue';

interface FormField {
	value: ShallowRef<string>;
	error: ShallowRef<string>;
	isRequired: boolean;
}

export type {
	FormField,
}
