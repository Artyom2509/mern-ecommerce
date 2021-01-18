import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import AdminNav from '../../../components/nav/AdminNav';
import axios from '../../../server/axios';
import DatePicker from 'react-datepicker';
import { DeleteOutlined } from '@ant-design/icons';

const CreateCoupon = () => {
	const [name, setName] = useState('');
	const [expiry, setExpiry] = useState('');
	const [discount, setDiscount] = useState('');
	const [loading, setLoading] = useState(false);
	const [coupons, setCoupons] = useState([]);
	const user = useSelector((state) => state.user);

	useEffect(() => {
		loadAllCoupons();
	}, [loading]);

	const handleSubmit = async () => {
		setLoading(true);

		try {
			const res = await axios.createCoupon(
				{ name, expiry, discount },
				user.token
			);
			setLoading(false);
			setName('');
			setExpiry('');
			setDiscount('');
			toast.success(`${res.data.name} created`);
		} catch (error) {
			console.log('handleSubmit -> error', error);
			toast.error(error.message);
			setLoading(false);
		}
	};

	const loadAllCoupons = async () => {
		const coupons = await axios.getCoupons();
		setCoupons(coupons.data);
	};

	const handleCouponRemove = async (id) => {
		setLoading(true);
		if (window.confirm('Delete?')) {
			try {
				const res = await axios.removeCoupon(id, user.token);
				setLoading(false);
				toast.success(`${res.data.name} deleted`);
			} catch (error) {
				toast.error(error.message);
				setLoading(false);
			}
		}
	};

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-2">
					<AdminNav />
				</div>

				<div className="col-md-10">
					{loading ? (
						<h4 className="text-danger">Loading...</h4>
					) : (
						<h4>Coupon</h4>
					)}

					<form onSubmit={(e) => e.preventDefault()} style={{ width: '400px' }}>
						<div className="form-group">
							<input
								type="text"
								className="form-control"
								onChange={(e) => setName(e.target.value)}
								value={name}
								placeholder="Name"
								autoFocus
								required
							/>
						</div>

						<div className="form-group">
							<input
								type="text"
								className="form-control"
								onChange={(e) => setDiscount(e.target.value)}
								value={discount}
								placeholder="Discount %"
								required
							/>
						</div>

						<div className="form-group">
							<DatePicker
								className="form-control"
								selected={new Date()}
								onChange={(date) => setExpiry(date)}
								placeholder="Expiry"
								value={expiry}
								reqired
							/>
						</div>

						<button
							className="btn btn-outline-primary"
							onClick={handleSubmit}
							disabled={
								name.length < 6 ||
								name.length > 12 ||
								!expiry ||
								!discount ||
								loading
							}>
							Save
						</button>
					</form>

					<hr />
					<h4>Coupons: {coupons.length}</h4>
					<div className="col-md-8">
						<table className="table table-bordered">
							<thead className="thead-light">
								<tr>
									<th scope="col">#</th>
									<th scope="col">Name</th>
									<th scope="col">Discount</th>
									<th scope="col">Expiry</th>
									<th scope="col">Action</th>
								</tr>
							</thead>

							<tbody>
								{coupons.map(({ expiry, discount, name, _id }, i) => (
									<tr key={_id}>
										<td>{i + 1}</td>
										<td>{name}</td>
										<td>{discount}%</td>
										<td>{new Date(expiry).toLocaleDateString()}</td>
										<td>
											<span
												onClick={() => handleCouponRemove(_id)}
												className="btn btn-sm">
												<DeleteOutlined className="text-danger" />
											</span>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreateCoupon;
