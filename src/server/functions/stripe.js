const stripe = {
	async createPaymentIntent(coupon, authToken) {
		return this.connect('post')(
			`/create-payment-intent`,
			{ coupon },
			{
				headers: {
					authToken,
				},
			}
		);
	},
};

export default stripe;
