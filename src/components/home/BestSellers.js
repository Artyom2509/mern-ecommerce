import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { Pagination } from 'antd';
import axios from '../../server/axios';
import LoadingCard from '../cards/LoadingCard';
import ProductCard from '../cards/ProductCard';

const BestSellers = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(1);
	const [productsCount, setProductsCount] = useState(0);
	const rowRef = useRef(4);

	useEffect(() => {
		getLatestProducts(page);
	}, [page]);

	useEffect(() => {
		getProductsCount();
	}, []);

	const getProductsCount = async () => {
		const count = await axios.productsCount();
		setProductsCount(count.data);
	};

	const getLatestProducts = async (page) => {
		setLoading(true);
		try {
			const res = await axios.getProducts('sold', 'desc', page);
			setProducts(res.data);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			toast.error(error.message);
		}
	};

	return (
		<div className="container">
			<div className="row">
				{loading ? (
					<LoadingCard count={rowRef.current} />
				) : (
					products.map((product) => (
						<ProductCard
							key={product._id}
							product={product}
							loading={loading}
						/>
					))
				)}
			</div>

			<nav className="text-center p-4">
				<Pagination
					current={page}
					total={(productsCount / rowRef.current) * 10}
					onChange={(value) => setPage(value)}
				/>
			</nav>
		</div>
	);
};

export default BestSellers;
