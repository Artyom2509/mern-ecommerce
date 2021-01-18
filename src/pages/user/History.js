import React, { useEffect, useState } from 'react';
import UserNav from './../../components/nav/UserNav';
import { useSelector } from 'react-redux';
import axios from '../../server/axios';
import ShowPaymentInfo from '../../components/cards/ShowPaymentInfo';
import { PDFDownloadLink } from '@react-pdf/renderer';
import Invoice from '../../components/order/Invoice';
import OrderTable from '../../components/order/OrderTable';

const History = () => {
	const [orders, setOrders] = useState([]);
	const user = useSelector((state) => state.user);

	useEffect(() => getOrders(), []);

	const getOrders = async () => {
		const res = await axios.getOrders(user.token);
		setOrders(res.data);
	};

	const showEachOrders = () =>
		orders.map((order, i) => (
			<div key={i} className="mb-5 p-3 card">
				<ShowPaymentInfo order={order} />
				<OrderTable order={order} />
				<div className="row">
					<div className="col">{showDownloadLink(order)}</div>
				</div>
			</div>
		));

	const showDownloadLink = (order) => (
		<PDFDownloadLink
			document={<Invoice order={order} />}
			fileName="invoice.pdf"
			className="btn btn-small btn-outline-primary btn-block">
			Download PDF
		</PDFDownloadLink>
	);

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-2">
					<UserNav />
				</div>

				<div className="col-md-10">
					<h4 className="mb-4">
						{orders.length ? 'User purchase oders' : 'No purchase oders'}
					</h4>
					{showEachOrders()}
				</div>
			</div>
		</div>
	);
};

export default History;
