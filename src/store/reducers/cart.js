import { ADD_TO_CART, REMOVE_ALL_CART, REMOVE_IN_CART, UPDATE_IN_CART } from '../actionTypes';

const initialState = !localStorage.getItem('cart')
	? []
	: JSON.parse(localStorage.getItem('cart'));

const cart = (state = initialState, { type, payload }) => {
	switch (type) {
		case ADD_TO_CART:
			return [...payload];

		case UPDATE_IN_CART:
			return [...payload];

		case REMOVE_IN_CART:
			return [...payload];

		case REMOVE_ALL_CART:
			return [];

		default:
			return state;
	}
};

export default cart;
