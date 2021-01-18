import React, { useRef } from 'react';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import ProductCartInCheckout from '../components/cards/ProductCartInCheckout';
import axios from '../server/axios';
import { toast } from 'react-toastify';
import { actionApplyedCOD } from '../store/actions/pay';

const Cart = () => {
	const { cart, user } = useSelector((state) => ({ ...state }));
	const history = useHistory();
	const dispatch = useDispatch();

	const saveOrderToDb = async ({ target }) => {
 		try {
			const res = await axios.userCart(cart, user.token);
			if (target.name === 'COD') dispatch(actionApplyedCOD());
			toast(res.data.message);
			history.push('/checkout');
		} catch (error) {
			toast.error(error.message);
		}
	};

	const showCartItems = () => (
		<table className="table table-bordered">
			<thead className="thead-light">
				<tr>
					<th scope="col">#</th>
					<th scope="col">Image</th>
					<th scope="col">Title</th>
					<th scope="col">Price</th>
					<th scope="col">Brand</th>
					<th scope="col">Count</th>
					<th scope="col">Color</th>
					<th scope="col">Shipping</th>
					<th scope="col">Remove</th>
				</tr>
			</thead>

			<tbody>
				{cart.map((product, idx) => (
					<ProductCartInCheckout
						key={product._id}
						product={product}
						idx={idx}
					/>
				))}
			</tbody>
		</table>
	);

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-8">
					<h4>Cart / {cart.length} Products</h4>
					<br />
					{!cart.length ? (
						<p>
							No products in cart. <Link to="/shop">Continue shopping</Link>
						</p>
					) : (
						showCartItems()
					)}
				</div>

				<div className="col-md-4">
					<h4>Order Summary</h4>
					<hr />
					<p>{!cart.length ? 'Add products to cart' : 'Products'}</p>
					{cart.map(({ title, price, count }, i) => (
						<div key={i}>
							<p>
								{title} x {count} = ${count * price}
							</p>
						</div>
					))}
					<hr />
					<h6>Total: ${cart.reduce((acc, p) => acc + p.count * p.price, 0)}</h6>
					<hr />
					{user ? (
						<>
							<Button
								onClick={saveOrderToDb}
								className="btn btn-sm btn-primary mt-2"
								disabled={!cart.length}>
								Procced to Checkout
							</Button>
							<button
								name="COD"
								onClick={saveOrderToDb}
								className="btn btn-sm btn-warning mt-2 ml-2"
								disabled={!cart.length}>
								Pay Cash on Delivery
							</button>
						</>
					) : (
						<Link
							to={{ pathname: '/login', state: { from: 'cart' } }}
							className="btn btn-sm btn-primary mt-2">
							Login to Checkout
						</Link>
					)}
				</div>
			</div>
		</div>
	);
};

export default Cart;
