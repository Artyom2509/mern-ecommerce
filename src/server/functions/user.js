const user = {
	async userCart(cart, authToken) {
		return await this.connect('post')(
			`/user/cart`,
			{ cart },
			{
				headers: {
					authToken,
				},
			}
		);
	},

	async getUserCart(authToken) {
		return await this.connect()(`/user/cart`, {
			headers: {
				authToken,
			},
		});
	},

	async emptyUserCart(authToken) {
		return await this.connect('delete')(`/user/cart`, {
			headers: {
				authToken,
			},
		});
	},

	async saveUserAddress(address, authToken) {
		return await this.connect('post')(
			`/user/address`,
			{ address },
			{
				headers: {
					authToken,
				},
			}
		);
	},

	async applyCoupon(coupon, authToken) {
		return await this.connect('post')(
			`/user/cart/coupon`,
			{ coupon },
			{
				headers: {
					authToken,
				},
			}
		);
	},

	async createOrder(stripeResponse, authToken) {
		return await this.connect('post')(
			`/user/order`,
			{ stripeResponse },
			{
				headers: {
					authToken,
				},
			}
		);
	},

	async getOrders(authToken) {
		return await this.connect()(`/user/orders`, {
			headers: {
				authToken,
			},
		});
	},

	async getWishlist(authToken) {
		return await this.connect()(`/user/wishlist`, {
			headers: {
				authToken,
			},
		});
	},

	async removeFromWishlist(productId, authToken) {
		return await this.connect('put')(
			`/user/wishlist`,
			{ productId },
			{
				headers: {
					authToken,
				},
			}
		);
	},

	async addToWishlist(productId, authToken) {
		return await this.connect('post')(
			`/user/wishlist`,
			{ productId },
			{
				headers: {
					authToken,
				},
			}
		);
	},

	async createCashOrder(coupon, authToken) {
		return await this.connect('post')(
			`/user/cash-order`,
			{ coupon },
			{
				headers: {
					authToken,
				},
			}
		);
	},
};

export default user;
