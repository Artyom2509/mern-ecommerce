import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from '../../server/axios';
import LoadingCard from '../../components/cards/LoadingCard';
import ProductCard from '../../components/cards/ProductCard';

const CategoryHome = ({ match }) => {
	const { slug } = match.params;
	const [category, setCategory] = useState({});
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		getCategory();
	}, []);

	const getCategory = async () => {
		setLoading(true);
		try {
			const { data } = await axios.getCategory(slug);
			setCategory(data.category);
			setProducts(data.products);
			setLoading(false);
		} catch (error) {
			toast.error(error.message);
			setLoading(false);
		}
	};

	return (
		<div className="container">
			<h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
				{products.length} Products in "{category.name}" category
			</h4>
			<div className="row">
				{loading ? (
					<LoadingCard />
				) : (
					products.map((product) => (
						<ProductCard key={product._id} product={product} />
					))
				)}
			</div>
		</div>
	);
};

export default CategoryHome;
