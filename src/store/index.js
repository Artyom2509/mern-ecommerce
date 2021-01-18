import { combineReducers } from 'redux';
import user from './reducers/user';
import search from './reducers/search';
import cart from './reducers/cart';
import drawer from './reducers/drawer';
import pay from './reducers/pay';

export default combineReducers({
	user,
	search,
	cart,
	drawer,
	pay,
});
