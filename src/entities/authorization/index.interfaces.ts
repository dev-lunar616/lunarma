import type { FormField } from '@/services/form/index.interfaces';

interface AuthorizationSignInForm {
	login: FormField;
	password: FormField;
}

export type {
	AuthorizationSignInForm,
}
