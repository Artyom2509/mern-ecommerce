import {
	CASH_ON_DELIVERY_APPLIED,
	CASH_ON_DELIVERY_NOT_APPLIED,
	COUPON_APPLIED,
	COUPON_NOT_APPLIED,
} from '../actionTypes';

export const actionApplyedCoupon = () => ({
	type: COUPON_APPLIED,
});

export const actionNotApplyedCoupon = () => ({
	type: COUPON_NOT_APPLIED,
});

export const actionApplyedCOD = () => ({
	type: CASH_ON_DELIVERY_APPLIED,
});

export const actionNotApplyedCOD = () => ({
	type: CASH_ON_DELIVERY_NOT_APPLIED,
});
