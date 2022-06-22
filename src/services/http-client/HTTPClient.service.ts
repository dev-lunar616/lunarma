class HTTPClientService {
	async post(url: string): Promise<Response> {
		return await fetch(url, {
			method: 'GET',
		});
	}
}

export {
	HTTPClientService,
}
