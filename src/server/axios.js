import axios from 'axios';
import authInterface from './functions/auth';
import categories from './functions/category';
import subs from './functions/sub';
import user from './functions/user';
import product from './functions/product';
import files from './functions/files';
import coupon from './functions/coupon';
import stripe from './functions/stripe';
import admin from './functions/admin';

class Client {
	constructor(axios) {
		this.client = axios.create({
			baseURL: process.env.REACT_APP_API_URL,
		});
	}

	connect = (method = 'get') => {
		return this.client[method];
	};
}

Object.assign(
	Client.prototype,
	authInterface,
	categories,
	subs,
	product,
	user,
	files,
	coupon,
	stripe,
	admin
);

export default new Client(axios);
