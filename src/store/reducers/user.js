import {
	ADD_TO_WISHLIST,
	LOAD_WISHLIST,
	LOGGED_IN_USER,
	LOGOUT,
} from './../actionTypes';

const initialState = {
	name: null,
	email: null,
	token: null,
	role: null,
	picture: null,
	_id: null,
	wishlist: [],
};

const user = (state = initialState, { type, user, payload }) => {
	switch (type) {
		case LOGGED_IN_USER:
			return { ...state, ...user };

		case LOGOUT:
			return {
				name: null,
				email: null,
				token: null,
				role: null,
				picture: null,
				_id: null,
				wishlist: [],
			};

		case ADD_TO_WISHLIST:
			return { ...state, wishlist: [...state.wishlist, ...payload] };

		case LOAD_WISHLIST:
			return { ...state, wishlist: payload };

		default:
			return state;
	}
};

export default user;
