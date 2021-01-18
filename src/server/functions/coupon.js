const coupon = {
	async createCoupon(coupon, authToken) {
		return await this.connect('post')(
			`/coupon`,
			coupon ,
			{
				headers: {
					authToken,
				},
			}
		);
	},

	async getCoupons() {
		return await this.connect()(`/coupons`);
	},

	async removeCoupon(couponId, authToken) {
		return await this.connect('delete')(`/coupon/${couponId}`, {
			headers: {
				authToken,
			},
		});
	},
};

export default coupon;
