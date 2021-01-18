const admin = {
	async allOrders(authToken) {
		return this.connect()(`/admin/orders`, {
			headers: {
				authToken,
			},
		});
	},

	async changeOrderStatus(orderId, orderStatus, authToken) {
		return this.connect('put')(
			`/admin/order-status`,
			{ orderId, orderStatus },
			{
				headers: {
					authToken,
				},
			}
		);
	},
};

export default admin;
