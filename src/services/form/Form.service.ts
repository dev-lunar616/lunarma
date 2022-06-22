import { shallowRef } from 'vue';

import { regexp } from '@/utils/regexp/index';

import type { FormField } from '@/services/form/index.interfaces';

class FormService {
	public form: Record<string, FormField>;

	public constructor(
		{
			fields, 
			required,
		}: {
			fields: string[],
			required: string[] | boolean,
		}) {
		this.buildForm(fields, required);
	}

	private buildForm(
		fields: string[],
		required: string[] | boolean,
	): void {
		this.form = fields.reduce((result: Record<string, FormField>, field: string) => {
			result[field] = {
				value: shallowRef(''),
				error: shallowRef(''),
				isRequired: typeof required === 'boolean'
					? true
					: required.includes(field),
			}

			return result;
		}, {} as Record<string, FormField>)
	}

	public static validateEmail(field: string): string {
		return regexp.email.test(field) || !field
			? ''
			: 'Необходимо указать корректную электронную почту';
	}

	public initialize(form: Record<string, any>): void {
		Object
			.entries(form)
			.forEach(([key, value]) => {
				if (key in this.form) {
					this.form[key].value.value = value;
				}
			})
	}

	public validate(
		field: keyof typeof this.form, 
		validator: (field: string) => string,
	): Error | void {
		if (!this.form.hasOwnProperty(field)) {
			throw new Error(`The ${field} field doesn't exist in the form object`);
		}

		this.form[field].error.value =  validator(this.form[field].value.value);
	}
}

export {
	FormService,
}
