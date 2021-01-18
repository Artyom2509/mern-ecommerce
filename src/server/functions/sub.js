const subs = {
	async getSubs() {
		return await this.connect()(`/subs`);
	},

	async getSub(slug) {
		return await this.connect()(`/sub/${slug}`);
	},

	async removeSub(slug, authToken) {
		return await this.connect('delete')(`/sub/${slug}`, {
			headers: {
				authToken,
			},
		});
	},

	async updateSub(slug, name, parent, authToken) {
		return await this.connect('put')(
			`/sub/${slug}`,
			{ name, parent },
			{
				headers: {
					authToken,
				},
			}
		);
	},

	async createSub(name, parent, authToken) {
		return await this.connect('post')(
			`/sub`,
			{ name, parent },
			{
				headers: {
					authToken,
				},
			}
		);
	},
};

export default subs;
