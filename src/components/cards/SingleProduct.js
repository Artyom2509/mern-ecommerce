import React, { useCallback, useRef, useState } from 'react';
import { Card, Tabs, Tooltip } from 'antd';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Carousel } from 'react-responsive-carousel';
import ProductListItems from './ProductListItems';
import StarRatings from 'react-star-ratings';
import RatingModal from '../modal/RatingModal';
import AverageRating from '../rating/AverageRating';
import { useDispatch, useSelector } from 'react-redux';
import { actionAddToCart } from '../../store/actions/cart';
import { toast } from 'react-toastify';
import {
	actionAddToWishlist,
	actionRemoveFromWishlist,
} from '../../store/actions/user';

const { TabPane } = Tabs;

const SingleProduct = ({ product, onStarClick, star }) => {
	const { _id, images, title, description, ratings } = product;
	const [tooltip, setTooltip] = useState('Click to add');
	const [wishlistTooltip, setWishlistTooltip] = useState('Add to wishlist');

	const dispatch = useDispatch();
	const { wishlist } = useSelector((state) => state.user);

	const addedToWishlist = () => wishlist.some((p) => p._id === _id);

	const defaultImage = useRef([
		{
			url: process.env.REACT_APP_DEFAULT_IMG,
			public_id: 'no-photo',
		},
	]);

	const handleAddToCart = () => {
		if (product.quantity < 1) {
			toast.error('No products available');
			return;
		}

		dispatch(actionAddToCart(product));
		setTooltip('Added to cart');
	};

	const handleAddToWishlist = () => {
		dispatch(actionAddToWishlist(product));
		setWishlistTooltip('Added to wishlist');
	};

	const handleRemoveFromWishlist = () => {
		dispatch(actionRemoveFromWishlist(product._id));
		setWishlistTooltip('Add to wishlist');
	};

	const imagesMemo = useCallback(() => {
		let img = images;
		if (img === undefined || img.length === 0) img = defaultImage.current;

		return img.map(({ url, public_id }) => (
			<div key={public_id}>
				<img src={url} alt={public_id} />
			</div>
		));
	}, [images]);

	return (
		<>
			<div className="col-md-7">
				<Carousel showArrows={true} autoPlay infiniteLoop showThumbs={true}>
					{imagesMemo()}
				</Carousel>

				<Tabs type="card">
					<TabPane tab="Description" key={1}>
						{description}
					</TabPane>
					<TabPane tab="More" key={2}>
						Call us on xxxx xx xx to learn more about this product.
					</TabPane>
				</Tabs>
			</div>

			<div className="col-md-5">
				<h1 className="bg-info p-3">
					{`${title} `}
					{product.quantity < 1 && <span className="bg-danger p-3">Sold</span>}
				</h1>

				<AverageRating id={_id} ratings={ratings} />

				<Card
					actions={[
						<Tooltip title={tooltip}>
							<p onClick={handleAddToCart}>
								<ShoppingCartOutlined key="ellipsis" className="text-danger" />
								<br />
								Add to Cart
							</p>
						</Tooltip>,
						<Tooltip title={wishlistTooltip}>
							{!addedToWishlist() ? (
								<span onClick={handleAddToWishlist}>
									<HeartOutlined className="text-info" />
									<br />
									Add to Whishlist
								</span>
							) : (
								<span onClick={handleRemoveFromWishlist}>
									<HeartOutlined className="text-danger" />
									<br />
									Remove from Whishlist
								</span>
							)}
						</Tooltip>,
						<RatingModal>
							<StarRatings
								rating={star}
								starRatedColor="#F44336"
								changeRating={onStarClick}
								numberOfStars={5}
								name={_id}
								starDimension="30px"
								starSpacing="5px"
								isSelectable={true}
							/>
						</RatingModal>,
					]}>
					<ProductListItems {...product} />
				</Card>
			</div>
		</>
	);
};

export default SingleProduct;
