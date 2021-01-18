const files = {
	async updoadFiles(image, authToken) {
		return await this.connect('post')(
			`/uploadimages`,
			{ image },
			{
				headers: {
					authToken,
				},
			}
		);
	},

	async removeFile(public_id, authToken) {
		return await this.connect('post')(
			`/removeimage`,
			{ public_id },
			{
				headers: {
					authToken,
				},
			}
		);
	},
};

export default files;
