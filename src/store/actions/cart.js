import {
	ADD_TO_CART,
	UPDATE_IN_CART,
	REMOVE_IN_CART,
	REMOVE_ALL_CART,
} from '../actionTypes';
import _ from 'lodash';
import { actionOpenDrawer } from './drawer';

export const actionAddToCart = (product) => (dispatch, getState) => {
	const cart = getState().cart;

	if (cart.some((p) => p._id.includes(product._id))) {
		cart.map((p) =>
			p._id.includes(product._id) ? { ...p, count: p.count++ } : p
		);
	} else {
		cart.push({ ...productSchema(product), count: 1 });
	}

	const unique = _.uniqWith(cart, _.isEqual);

	dispatch({
		type: ADD_TO_CART,
		payload: unique,
	});

	dispatch(actionOpenDrawer());

	localStorage.setItem('cart', JSON.stringify(unique));
};

export const actionUpdateInCart = (product, item) => (dispatch, getState) => {
	const cart = getState().cart;

	const updated = cart.map((p) =>
		p._id.includes(product._id) ? { ...p, ...item } : p
	);

	dispatch({
		type: UPDATE_IN_CART,
		payload: updated,
	});

	localStorage.setItem('cart', JSON.stringify(updated));
};

export const actionRemoveInCart = (id) => (dispatch, getState) => {
	const cart = getState().cart;
	const deleted = cart.filter((p) => !p._id.includes(id));

	dispatch({
		type: REMOVE_IN_CART,
		payload: deleted,
	});

	localStorage.setItem('cart', JSON.stringify(deleted));
};

export const actionRemoveAllInCart = () => (dispatch) => {
	dispatch({
		type: REMOVE_ALL_CART,
	});

	localStorage.removeItem('cart');
};

const productSchema = ({
	_id,
	images,
	title,
	brand,
	color,
	shipping,
	price,
	quantity,
	sold,
	slug,
}) => ({
	_id,
	images,
	title,
	brand,
	color,
	shipping,
	price,
	quantity,
	sold,
	slug,
});
