import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import React from 'react';

const OrderTable = ({ order }) => (
	<table className="table table-bordered">
		<thead className="thead-light">
			<tr>
				<th scope="col">№</th>
				<th scope="col">Title</th>
				<th scope="col">Price</th>
				<th scope="col">Brand</th>
				<th scope="col">Color</th>
				<th scope="col">Count</th>
				<th scope="col">Shipping</th>
			</tr>
		</thead>

		<tbody>
			{order.products.map((p, i) => (
				<tr key={i}>
					<td>{i + 1}</td>
					<td>
						<b>{p.product.title}</b>
					</td>
					<td>${p.product.price}</td>
					<td>{p.product.brand}</td>
					<td>{p.color}</td>
					<td>{p.count}</td>
					<td>
						{p.product.shipping === 'Yes' ? (
							<CheckCircleOutlined className="text-success" />
						) : (
							<CloseCircleOutlined className="text-danger" />
						)}
					</td>
				</tr>
			))}
		</tbody>
	</table>
);

export default OrderTable;
