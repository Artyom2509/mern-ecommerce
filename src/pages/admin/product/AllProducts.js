import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import AdminProductCard from '../../../components/cards/AdminProductCard';
import axios from '../../../server/axios';
import AdminNav from './../../../components/nav/AdminNav';

const AllProducts = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);
	const user = useSelector((state) => state.user);

	const loadAllProducts = useCallback(async (count = 10) => {
		setLoading(true);

		try {
			const products = await axios.getProductsByCount(count);
			setProducts(products.data);
			setLoading(false);
		} catch (error) {
			toast.error(error.message);
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		loadAllProducts(100);
	}, []);

	const handleDelete = async (slug) => {
		if (window.confirm(`Are you sure to delete?`)) {
			try {
				const deleted = await axios.deleteProduct(slug, user.token);
				loadAllProducts(100)
				toast.success(`${deleted.data.title} is deleted`);
			} catch (error) {
				toast.error(error.message);
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
						<h4 className="text-danger mb-4">Loading...</h4>
					) : (
						<h4 className="mb-4">All products</h4>
					)}
					<div className="row">
						{products.map((product) => (
							<AdminProductCard
								product={product}
								key={product._id}
								handleDelete={handleDelete}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default AllProducts;
