import { SET_DRAWER_CLOSED, SET_DRAWER_OPENED } from '../actionTypes';

export const actionOpenDrawer = () => ({
	type: SET_DRAWER_OPENED,
});

export const actionCloseDrawer = () => ({
	type: SET_DRAWER_CLOSED,
});
