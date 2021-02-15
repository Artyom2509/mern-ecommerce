import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Card, Tooltip } from 'antd';
import { toast } from 'react-toastify';
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import Meta from 'antd/lib/card/Meta';
import { Link } from 'react-router-dom';
import AverageRating from '../rating/AverageRating';
import { actionAddToCart } from '../../store/actions/cart';

const ProductCard = ({ product, loading = false, size = 'col-md-3' }) => {
	const { title, images, description, slug, _id, ratings } = product;
	const [tooltip, setTooltip] = useState('Click to add');
	const dispatch = useDispatch();

	const handleAddToCart = () => {
		if (product.quantity < 1) {
			toast.error('No products available');
			return;
		}

		dispatch(actionAddToCart(product));
		setTooltip('Added');
	};

	return (
		<div className={`${size} mb-3`}>
			<AverageRating id={_id} ratings={ratings} size={[20, 3]} />
			<br />
			<Card
				cover={
					<img
						className="p-2"
						alt={title}
						src={
							!loading && (images[0]?.url || process.env.REACT_APP_DEFAULT_IMG)
						}
					/>
				}
				actions={[
					<Link to={`/product/${slug}`}>
						<EyeOutlined key="edit" className="text-warning" />
						<br /> View Product
					</Link>,
					<Tooltip title={tooltip}>
						<p onClick={handleAddToCart}>
							<ShoppingCartOutlined key="ellipsis" className="text-danger" />
							<br />
							Add to Cart
						</p>
					</Tooltip>,
				]}>
				<Meta
					title={
						<div>
							{product.title}{' '}
							{product.quantity < 1 && (
								<span className="bg-danger p-2"> Sold </span>
							)}
						</div>
					}
					description={
						description.length > 30
							? description.substr(0, 30) + '...'
							: description
					}
				/>
				<div className="d-flex">
					<strong className="mt-2">{`$${prettify(product.price)}`}</strong>
				</div>
			</Card>
		</div>
	);
};

function prettify(num) {
	var n = num.toString();
	return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, '$1' + ' ');
}

export default ProductCard;
