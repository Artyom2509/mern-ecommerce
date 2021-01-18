import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from '../server/axios';
import ReactQuill from 'react-quill';
import { actionRemoveAllInCart } from '../store/actions/cart';
import {
	actionApplyedCoupon,
	actionNotApplyedCOD,
	actionNotApplyedCoupon,
} from '../store/actions/pay';

const Checkout = ({ history }) => {
	const { user, pay } = useSelector((state) => state);
	const [products, setProducts] = useState([]);
	const [total, setTotal] = useState(0);
	const [address, setAddress] = useState('');
	const [coupon, setCoupon] = useState('');
	const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
	const [discountError, setDiscountError] = useState('');
	const [addressSaved, setAddressSaved] = useState(false);

	const dispatch = useDispatch();

	useEffect(() => {
		loadUserCart();
	}, []);

	const loadUserCart = async () => {
		try {
			const res = await axios.getUserCart(user.token);
			setProducts(res.data.products);
			setTotal(res.data.cartTotal);
		} catch (error) {
			toast.error(error.message);
		}
	};

	const saveAddressToDb = async () => {
		const res = await axios.saveUserAddress(address, user.token);

		if (res.data.ok) {
			setAddressSaved(true);
			toast.success('Address saved');
		}
	};

	const createCashOrder = async () => {
		try {
			await axios.createCashOrder(pay.coupon, user.token);
			dispatch(actionRemoveAllInCart());
			dispatch(actionNotApplyedCOD());
			dispatch(actionNotApplyedCoupon());
			setProducts([]);
			setTotal(0);
			setTotalAfterDiscount(0);
			history.push('/user/history');
		} catch (error) {
			toast.error(error.message);
		}
	};

	const handlePlaceOrder = () => history.push('/payment');

	const emptyUserCart = async () => {
		if (window.confirm('Remove cart?')) {
			try {
				const res = await axios.emptyUserCart(user.token);
				dispatch(actionNotApplyedCoupon());
				dispatch(actionNotApplyedCOD());
				dispatch(actionRemoveAllInCart());
				setProducts([]);
				setTotal(0);
				setTotalAfterDiscount(0);
				toast(res.data.message);
			} catch (error) {
				toast.error(error.message);
			}
		}
	};

	const applyDiscountCoupon = async () => {
		setDiscountError('');
		const res = await axios.applyCoupon(coupon, user.token);

		if (res.data) {
			setTotalAfterDiscount(res.data);
			dispatch(actionApplyedCoupon());
		}
		if (res.data.error) {
			setDiscountError(res.data.error);
			dispatch(actionNotApplyedCoupon());
		}
		setCoupon('');
	};

	const showAddress = () => (
		<>
			<ReactQuill value={address} onChange={(value) => setAddress(value)} />
			<Button className="btn btn-primary mt-2" onClick={saveAddressToDb}>
				Save
			</Button>
		</>
	);

	const showProductSummary = (products) =>
		products.map((p, i) => (
			<div key={i}>
				<p>
					{p.product.title} ({p.color}) x {p.count} ={' '}
					{p.product.price * p.count}
				</p>
			</div>
		));

	const showApplyCoupon = () => (
		<div style={{ width: '200px' }}>
			{discountError && <span className="text-danger">{discountError}</span>}
			<input
				onChange={(e) => setCoupon(e.target.value)}
				type="text"
				value={coupon}
				className="form-control"
			/>
			<button onClick={applyDiscountCoupon} className="btn btn-primary mt-2">
				Apply
			</button>
		</div>
	);

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-6">
					<h4>Delivery Address</h4>
					{showAddress()}
					<h4>Got coupon</h4>
					{showApplyCoupon()}
				</div>

				<div className="col-md-6">
					<h4>Order Summary</h4>
					<hr />
					<p>Products count - {products.length}</p>
					{showProductSummary(products)}
					<hr />
					<div className="row mb-4">
						<div className="col-md-3">
							<b>Cart total: ${total}</b>
						</div>
						<div className="col">
							{totalAfterDiscount > 0 && (
								<b className="text-success">
									Discount Applied. Total: ${totalAfterDiscount}
								</b>
							)}
						</div>
					</div>

					<div className="row">
						<div className="col-md-3">
							{pay.cashOnDelivery ? (
								<Button
									disabled={!addressSaved || !products.length}
									onClick={createCashOrder}
									className="btn btn-primary">
									Create Order
								</Button>
							) : (
								<Button
									disabled={!addressSaved || !products.length}
									onClick={handlePlaceOrder}
									className="btn btn-primary">
									Place Order
								</Button>
							)}
						</div>
						<div className="col-md-3">
							<Button
								disabled={!products.length}
								onClick={emptyUserCart}
								className="btn btn-primary">
								Empty Cart
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Checkout;
