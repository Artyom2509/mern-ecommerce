import React, { useEffect, useState } from 'react';
import axios from '../server/axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import LoadingCard from '../components/cards/LoadingCard';
import ProductCard from '../components/cards/ProductCard';
import SingleProduct from '../components/cards/SingleProduct';

const Product = ({ match }) => {
	const [product, setProduct] = useState({});
	const [related, setRelated] = useState([]);
	const [loading, setLoading] = useState(false);
	const [waiting, setWaiting] = useState(false);
	const [star, setStar] = useState(0);
	const user = useSelector((state) => state.user);

	useEffect(() => {
		LoadProduct(match.params.slug);
	}, [loading]);

	useEffect(() => {
		getRelated(product);
	}, [product]);

	useEffect(() => {
		if (product.ratings && user) {
			const existingRatingObject = product.ratings.find(
				(elem) => elem.postedBy.toString() === user._id.toString()
			);

			existingRatingObject && setStar(existingRatingObject.star);
		}
	}, []);

	const onStarClick = async (newRating, name) => {
		setLoading(true);
		setStar(newRating);
		try {
			await axios.productStar(name, newRating, user.token);
			setLoading(false);
		} catch (error) {
			toast.error(error.message);
			setLoading(false);
		}
	};

	const LoadProduct = async (slug) => {
		setWaiting(true);
		try {
			const product = await axios.getProduct(slug);
			setProduct(product.data);
			setWaiting(false);
		} catch (error) {
			toast.error(error.message);
			setWaiting(false);
		}
	};

	const getRelated = async (product) => {
		setWaiting(true);
		try {
			const related = await axios.getRelated(product._id);
			setRelated(related.data);
			setWaiting(false);
		} catch (error) {
			toast.error(error.message);
			setWaiting(false);
		}
	};

	return (
		<div className="container-fluid">
			<div className="row pt-3">
				<SingleProduct
					product={product}
					onStarClick={onStarClick}
					star={star}
				/>
			</div>

			<div className="row">
				<div className="col text-center pt-5 pb-5">
					<hr />
					<h4>Related Products {related.length === 0 && 'not found'}</h4>
					<div className="row">
						{waiting ? (
							<LoadingCard count={4} />
						) : (
							related.map((prod) => (
								<ProductCard key={prod._id} product={prod} />
							))
						)}
					</div>
					<hr />
				</div>
			</div>
		</div>
	);
};

export default Product;
