import React, { useEffect, useState } from 'react';
import axios from '../../server/axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import AdminNav from './../../components/nav/AdminNav';
import Orders from '../../components/order/Orders';

const AdminDashboard = () => {
	const [orders, setOrders] = useState([]);
	const user = useSelector((state) => state.user);

	useEffect(() => {
		loadOrders();
	}, []);

	const loadOrders = async () => {
		const res = await axios.allOrders(user.token);
		setOrders(res.data);
	};

	const handleStatusChange = async (orderId, orderStatus) => {
		try {
			await axios.changeOrderStatus(orderId, orderStatus, user.token);
			loadOrders();
			toast.success(`Status updated`);
		} catch (error) {
			toast.error(error.message);
		}
	};

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-2">
					<AdminNav />
				</div>

				<div className="col-md-10">
					<h4 className="mb-4">Admin Dashboard</h4>
					{orders.length ? <Orders orders={orders} statusChange={handleStatusChange} /> : <h6>No purchase oders</h6>}
					
				</div>
			</div>
		</div>
	);
};

export default AdminDashboard;
