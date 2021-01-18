import { SET_DRAWER_OPENED, SET_DRAWER_CLOSED } from '../actionTypes';

const drawer = (state = false, { type }) => {
	switch (type) {
		case SET_DRAWER_OPENED:
			return true;

		case SET_DRAWER_CLOSED:
			return false;

		default:
			return state;
	}
};

export default drawer;
