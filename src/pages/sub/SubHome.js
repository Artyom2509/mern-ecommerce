import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from '../../server/axios';
import LoadingCard from '../../components/cards/LoadingCard';
import ProductCard from '../../components/cards/ProductCard';

const SubHome = ({ match }) => {
	const [sub, setSub] = useState({});
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		getSub(match.params.slug);
	}, [match]);

	const getSub = async (slug) => {
		setLoading(true);
		try {
			const { data } = await axios.getSub(slug);
			setSub(data.sub);
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
				{products.length} Products in "{sub.name}" sub category
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

export default SubHome;
