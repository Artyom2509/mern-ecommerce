import React from 'react';
import { Select } from 'antd';
import ShowPaymentInfo from '../cards/ShowPaymentInfo';
import OrderTable from './OrderTable';

const { Option } = Select;

const Orders = ({ orders, statusChange }) => {
	return orders.map((order) => (
		<div key={order._id} className="col-md-12 card p-3 mb-3">
			<ShowPaymentInfo order={order} />
			<div className="row text-center mb-3">
				<div className="col-md-2 ">Delivery Status</div>
				<div className="col-md-2">
					<Select
						style={{ width: 160 }}
						defaultValue={order.orderStatus}
						onChange={(value) => statusChange(order._id, value)}>
						<Option value="Not Processed">Not Processed</Option>
						<Option value="Cancelled">Cancelled</Option>
						<Option value="Dispatched">Dispatched</Option>
						<Option value="Cash On Delivery">Cash On Delivery</Option>
						<Option value="Processing">Processing</Option>
						<Option value="Completed">Completed</Option>
					</Select>
				</div>
			</div>

			<div className="row text-center">
				<div className="col-md-10">
					<OrderTable order={order} />
				</div>
			</div>
		</div>
	));
};

export default Orders;
