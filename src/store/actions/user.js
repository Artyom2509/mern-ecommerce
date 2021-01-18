import axios from '../../server/axios';
import {
	ADD_TO_WISHLIST,
	LOAD_WISHLIST,
	LOGGED_IN_USER,
	LOGOUT,
} from '../actionTypes';

export const userLogout = () => ({ type: LOGOUT, user: null });

export const loggedInUser = (data, token) => ({
	type: LOGGED_IN_USER,
	user: {
		name: data.name,
		email: data.email,
		token: token,
		role: data.role,
		picture: data.picture,
		_id: data._id,
	},
});

export const actionAddToWishlist = (product) => async (dispatch, getState) => {
	const { token, wishlist } = getState().user;
	const res = await axios.addToWishlist(product._id, token);

	if (res.data.ok) {
		let updateWishlist = [];
		if (!wishlist.some((el) => el._id === product._id)) {
			updateWishlist.push(product);
		}

		dispatch({
			type: ADD_TO_WISHLIST,
			payload: updateWishlist,
		});
	}
};

export const actionRemoveFromWishlist = (productId) => async (
	dispatch,
	getState
) => {
	const { token } = getState().user;
	const res = await axios.removeFromWishlist(productId, token);

	if (res.data.ok) dispatch(actionLoadWishlist());
};

export const actionLoadWishlist = () => async (dispatch, getState) => {
	const { token } = getState().user;
	const res = await axios.getWishlist(token);

	dispatch({
		type: LOAD_WISHLIST,
		payload: res.data.wishlist,
	});
};
