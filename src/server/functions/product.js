const product = {
	async createProduct(product, authToken) {
		return await this.connect('post')(`/product`, product, {
			headers: {
				authToken,
			},
		});
	},

	async getProducts(order, sort, page) {
		return await this.connect('post')(`/products`, { sort, order, page });
	},

	async updateProduct(slug, product, authToken) {
		return await this.connect('put')(`/product/${slug}`, product, {
			headers: {
				authToken,
			},
		});
	},

	async getProductsByCount(count) {
		return await this.connect()(`/products/${count}`);
	},

	async deleteProduct(slug, authToken) {
		return await this.connect('delete')(`/product/${slug}`, {
			headers: {
				authToken,
			},
		});
	},

	async getProduct(slug) {
		return await this.connect()(`/product/${slug}`);
	},

	async productsCount() {
		return await this.connect()(`/products/total`);
	},

	async productStar(productId, star, authToken) {
		return await this.connect('put')(
			`/product/star/${productId}`,
			{ star },
			{
				headers: {
					authToken,
				},
			}
		);
	},

	async getRelated(productId) {
		return await this.connect()(`/product/related/${productId}`);
	},

	async getProductsByFilter(arg) {
		return await this.connect('post')(`/search/filters`, arg);
	},
};

export default product;
