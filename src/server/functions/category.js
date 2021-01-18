const categories = {
	async getCategories() {
		return await this.connect()(`/categories`);
	},

	async getCategory(slug) {
		return await this.connect()(`/category/${slug}`);
	},

	async removeCategory(slug, authToken) {
		return await this.connect('delete')(`/category/${slug}`, {
			headers: {
				authToken,
			},
		});
	},

	async updateCategory(slug, name, authToken) {
		return await this.connect('put')(
			`/category/${slug}`,
			{ name },
			{
				headers: {
					authToken,
				},
			}
		);
	},

	async createCategory(name, authToken) {
		return await this.connect('post')(
			`/category`,
			{ name },
			{
				headers: {
					authToken,
				},
			}
		);
	},

	async getCategorySubs(id) {
		return await this.connect()(`/category/subs/${id}`);
	},
};

export default categories;
