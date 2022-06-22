class DataBaseService {
	static getDataBase(name: string, version: number): any {
		return new Promise((resolve, reject) => {
			const dataBaseRequest = window.indexedDB.open(name, version);

			dataBaseRequest.onsuccess = e => {
				// @ts-ignore
				resolve(e.target.result);
			}

			dataBaseRequest.onerror = e => {
				console.log('Error opening db', e);
				reject('Error');
			}

			dataBaseRequest.onupgradeneeded = e => {
				// @ts-ignore
				let db = e.target.result
				db.createObjectStore(
					name, 
					{ 
						autoIncrement: true, 
						keyPath: 'id',
					},
				);
			}
		});
	}
}

export {
	DataBaseService,
}
