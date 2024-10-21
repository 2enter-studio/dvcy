import type { TypedPocketBase } from './types.ts';

class SignImage {
	pb: TypedPocketBase;
	id: string;

	constructor(pb: TypedPocketBase, id: string) {
		this.pb = pb;
		this.id = id;
	}

	async getUrl() {
		const record = await this.getRecord();
		if (!record) return null;
		await this.pb.collection('paints').getOne(this.id);
		const token = await this.pb.files.getToken();
		return this.pb.files.getUrl(record, record.sign, { token });
	}

	async getType() {
		const record = await this.getRecord();
		if (!record) return null;
		return record.type;
	}

	async getRecord() {
		try {
			return await this.pb.collection('paints').getOne(this.id);
		} catch (e) {
			console.error(e);
			return null;
		}
	}

	async getBuffer() {
		const url = await this.getUrl();
		if (!url) return null;
		return await fetch(url).then((res) => res.arrayBuffer());
	}
}

export { SignImage };
