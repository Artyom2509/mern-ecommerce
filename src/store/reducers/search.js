import { SEARCH_QUERY } from '../actionTypes';

const initialState = { text: '' };

const search = (state = initialState, { type, payload }) => {
	switch (type) {
		case SEARCH_QUERY:
			return { ...state, ...payload };

		default:
			return state;
	}
};

export default search;
