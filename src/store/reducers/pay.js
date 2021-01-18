import {
	CASH_ON_DELIVERY_APPLIED,
	CASH_ON_DELIVERY_NOT_APPLIED,
	COUPON_APPLIED,
	COUPON_NOT_APPLIED,
} from '../actionTypes';

const initialState = {
	coupon: false,
	cashOnDelivery: false,
};

const coupon = (state = initialState, { type }) => {
	switch (type) {
		case COUPON_APPLIED:
			return { ...state, coupon: true };

		case COUPON_NOT_APPLIED:
			return { ...state, coupon: false };

		case CASH_ON_DELIVERY_APPLIED:
			return { ...state, cashOnDelivery: true };

		case CASH_ON_DELIVERY_NOT_APPLIED:
			return { ...state, cashOnDelivery: false };

		default:
			return state;
	}
};

export default coupon;
