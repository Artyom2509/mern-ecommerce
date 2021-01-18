const auth = {
	async createOrUpdateUser(authToken) {
		return await this.connect('post')(
			'/create-or-update-user',
			{},
			{
				headers: {
					authToken,
				},
			}
		);
	},

	async currentUser(authToken) {
		return await this.connect('post')(
			'/current-user',
			{},
			{
				headers: {
					authToken,
				},
			}
		);
	},

	async currentAdmin(authToken) {
		return await this.connect('post')(
			'/current-admin',
			{},
			{
				headers: {
					authToken,
				},
			}
		);
	},
};

export default auth;
