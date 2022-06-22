class ErrorService {
	text: string;

	constructor(text: string) {
		this.text = text;
	}

	throwLikeString(): string {
		return this.text;
	}

	throwLikeError(): Error {
		throw new Error(this.text);
	}
}

export {
	ErrorService,
}
