import React, { useEffect, useRef, useState } from 'react';
import { useStripe, CardElement, useElements } from '@stripe/react-stripe-js';
import axios from '../../server/axios';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from 'antd';
import { CheckOutlined, DollarOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { actionRemoveAllInCart } from '../../store/actions/cart';
import { actionNotApplyedCoupon } from '../../store/actions/pay';

const StripeCheckout = () => {
	const [succeeded, setSucceeded] = useState(false);
	const [error, setError] = useState(null);
	const [processing, setProcessing] = useState(false);
	const [disabled, setDisabled] = useState(true);
	const [clientSecret, setClientSecret] = useState('');
	const [cartTotal, setCartTotal] = useState(0);
	const [payable, setPayable] = useState(0);
	const [totalAfterDiscount, setTotalAfterDiscount] = useState(undefined);
	const cartStyle = useRef({
		style: {
			base: {
				color: '#32325d',
				fontFamily: 'Arial, sans-serif',
				fontSmoothing: 'antialiased',
				fontSize: '16px',
				'::placeholder': {
					color: '#32325d',
				},
			},
			invalid: {
				color: '#fa755a',
				iconColor: '#fa755a',
			},
		},
	});

	const { user, pay } = useSelector((state) => state);
	const dispatch = useDispatch();
	const stripe = useStripe();
	const elements = useElements();

	useEffect(() => createPaymentIntent(), []);

	const createPaymentIntent = async () => {
		const res = await axios.createPaymentIntent(pay.coupon, user.token);
		setCartTotal(res.data.cartTotal);
		setPayable(res.data.payable);
		setTotalAfterDiscount(res.data.totalAfterDiscount);
		setClientSecret(res.data.clientSecret);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setProcessing(true);

		const payload = await stripe.confirmCardPayment(clientSecret, {
			payment_method: {
				card: elements.getElement(CardElement),
				billing_details: {
					name: e.target.name.value,
				},
			},
		});

		if (payload.error) {
			setError(`Payment failed: ${payload.error.message}`);
			setProcessing(false);
		} else {
			const order = await axios.createOrder(payload, user.token);
			if (order.data.ok) {
				dispatch(actionRemoveAllInCart());
				dispatch(actionNotApplyedCoupon());
				await axios.emptyUserCart(user.token);
			}
			setError(null);
			setProcessing(false);
			setSucceeded(true);
		}
	};

	const handleChange = async (e) => {
		setDisabled(e.empty);
		setError(e.error ? e.error.message : '');
	};

	return (
		<>
			{!succeeded && (
				<div>
					{pay.coupon && totalAfterDiscount !== undefined ? (
						<p className="alert alert-success">{`Total after discount: $${totalAfterDiscount}`}</p>
					) : (
						<p className="alert alert-danger">No coupon applied</p>
					)}
				</div>
			)}
			<div className="text-center pb-5">
				<Card
					actions={[
						<>
							<DollarOutlined className="text-info" />
							<br />
							Total: ${cartTotal}
						</>,
						<>
							<CheckOutlined className="text-info" />
							<br />
							Total Payable: ${payable}
						</>,
					]}
				/>
			</div>

			<form id="payment-form" className="stripe-form" onSubmit={handleSubmit}>
				<CardElement
					id="card-element"
					options={cartStyle.current}
					onChange={handleChange}
				/>
				<button
					className="stripe-button"
					disabled={processing || disabled || succeeded}>
					<span id="button-text">
						{processing ? <div id="spinner" className="spinner"></div> : 'Pay'}
					</span>
				</button>
				<br />
				{error && (
					<div className="card-error" role="alert">
						{error}
					</div>
				)}
				<br />
				<p className={succeeded ? 'result-message' : 'result-message hidden'}>
					Payment Successful.{' '}
					<Link to="/user/history">See it in your purchase history.</Link>
				</p>
			</form>
		</>
	);
};

export default StripeCheckout;
