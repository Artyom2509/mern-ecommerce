import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import LoadingCard from '../components/cards/LoadingCard';
import ProductCard from '../components/cards/ProductCard';
import axios from '../server/axios';
import { Menu, Radio, Slider } from 'antd';
import {
	DollarOutlined,
	DownSquareOutlined,
	StarOutlined,
} from '@ant-design/icons';
import { SEARCH_QUERY } from '../store/actionTypes';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import Star from '../components/forms/Star';

const { SubMenu } = Menu;

const Shop = () => {
	const brands = useRef(['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'ASUS']);
	const colors = useRef(['Black', 'Brown', 'Silver', 'White', 'Blue']);
	const shippings = useRef(['Yes', 'No']);
	const [products, setProducts] = useState([]);
	console.log('Shop -> products', products);
	const [price, setPrice] = useState([0, 0]);
	const [loading, setLoading] = useState(false);
	const [ok, setOk] = useState(false);
	const [categories, setCategories] = useState([]);
	const [allSubs, setAllSubs] = useState([]);
	const [categoryIds, setCategoryIds] = useState([]);
	const [shipping, setshipping] = useState('');
	const [brand, setBrand] = useState('');
	const [color, setColor] = useState('');

	const { text } = useSelector((state) => state.search);
	const dispatch = useDispatch();

	useEffect(() => {
		loadAllProducts(12);
		loadAllCategories();
		loadAllSubs();
	}, []);

	useEffect(() => {
		const delayed = setTimeout(() => {
			if (text.length > 1) fetchProductsByFilter({ query: text });
		}, 300);

		return () => clearTimeout(delayed);
	}, [text]);

	useEffect(() => {
		if (ok) fetchProductsByFilter({ price });
	}, [ok, price]);

	const loadAllProducts = async (count) => {
		setLoading(true);
		try {
			const products = await axios.getProductsByCount(count);
			setProducts(products.data);
			setLoading(false);
		} catch (error) {
			toast.error(error.message);
			setLoading(false);
		}
	};

	const loadAllCategories = async () => {
		setLoading(true);
		try {
			const categories = await axios.getCategories();
			setCategories(categories.data);
			setLoading(false);
		} catch (error) {
			toast.error(error.message);
			setLoading(false);
		}
	};

	const loadAllSubs = async () => {
		setLoading(true);
		try {
			const subs = await axios.getSubs();
			setAllSubs(subs.data);
			setLoading(false);
		} catch (error) {
			toast.error(error.message);
			setLoading(false);
		}
	};

	const fetchProductsByFilter = async (arg) => {
		try {
			const products = await axios.getProductsByFilter(arg);
			setProducts(products.data);
		} catch (error) {
			toast.error(error.message);
		}
	};

	const handleSlider = (value) => {
		dispatch({
			type: SEARCH_QUERY,
			payload: { text: '' },
		});
		setCategoryIds([]);
		setBrand('');
		setColor('');
		setshipping('');

		setPrice(value);
		setTimeout(() => {
			setOk((ok) => !ok);
		}, 300);
	};

	const handleCheck = ({ target: { value } }) => {
		dispatch({
			type: SEARCH_QUERY,
			payload: { text: '' },
		});
		setPrice([0, 0]);
		setBrand('');
		setColor('');
		setshipping('');

		let inTheState = [...categoryIds];
		let foundInTheState = inTheState.indexOf(value);

		if (foundInTheState === -1) inTheState.push(value);
		else inTheState.splice(foundInTheState, 1);

		
		setCategoryIds(inTheState);
		if (!inTheState.length) return loadAllProducts(12);
		fetchProductsByFilter({ category: inTheState });
	};

	const handleStarClick = (stars) => {
		dispatch({
			type: SEARCH_QUERY,
			payload: { text: '' },
		});
		setPrice([0, 0]);
		setCategoryIds([]);

		fetchProductsByFilter({ stars });
	};

	const handleSubClick = (sub) => {
		dispatch({
			type: SEARCH_QUERY,
			payload: { text: '' },
		});
		setPrice([0, 0]);
		setCategoryIds([]);
		setBrand('');
		setColor('');
		setshipping('');

		fetchProductsByFilter({ subs: sub });
	};

	const handleBrandClick = (brand) => {
		dispatch({
			type: SEARCH_QUERY,
			payload: { text: '' },
		});
		setPrice([0, 0]);
		setCategoryIds([]);
		setColor('');
		setshipping('');
		setBrand(brand);

		fetchProductsByFilter({ brand });
	};

	const handleColorClick = (color) => {
		dispatch({
			type: SEARCH_QUERY,
			payload: { text: '' },
		});
		setPrice([0, 0]);
		setCategoryIds([]);
		setBrand('');
		setColor(color);
		setshipping('');

		fetchProductsByFilter({ color });
	};

	const handleShippingClick = (shipping) => {
		dispatch({
			type: SEARCH_QUERY,
			payload: { text: '' },
		});
		setPrice([0, 0]);
		setCategoryIds([]);
		setBrand('');
		setColor('');
		setshipping(shipping);

		fetchProductsByFilter({ shipping });
	};

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-3">
					<h4>Filter menu</h4>

					<Menu
						mode="inline"
						defaultOpenKeys={['1', '2', '3', '4', '5', '6', '7']}>
						<SubMenu
							key="1"
							title={
								<span className="h6">
									<DollarOutlined />
									Price
								</span>
							}>
							<div>
								<Slider
									className="ml-4 mr-4"
									tipFormatter={(v) => `$${v}`}
									range
									onChange={handleSlider}
									value={price}
									max={5000}
								/>
							</div>
						</SubMenu>

						<SubMenu
							key="2"
							title={
								<span className="h6">
									<DownSquareOutlined />
									Categories
								</span>
							}>
							<div>
								{categories.map(({ _id, name }) => (
									<div key={_id}>
										<Checkbox
											onChange={handleCheck}
											className="pb-2 pl-4 pr-4"
											value={_id}
											checked={categoryIds.includes(_id)}
											name="category">
											{name}
										</Checkbox>
									</div>
								))}
							</div>
						</SubMenu>

						<SubMenu
							key="3"
							title={
								<span className="h6">
									<StarOutlined />
									Rating
								</span>
							}>
							<div>
								{Array(5)
									.fill('')
									.map((_, idx) => (
										<div className="pb-2 pl-4 pr-4" key={idx}>
											<Star
												starClick={handleStarClick}
												numberOfStars={5 - idx}
											/>
										</div>
									))}
							</div>
						</SubMenu>

						<SubMenu
							key="4"
							title={
								<span className="h6">
									<DownSquareOutlined />
									Subs
								</span>
							}>
							<div className="pb-2 pl-4 pr-4">
								{allSubs.map(({ _id, name }) => (
									<div
										className="p-1 m-1 badge badge-secondary"
										style={{ cursor: 'pointer' }}
										key={_id}
										onClick={() => handleSubClick(_id)}>
										{name}
									</div>
								))}
							</div>
						</SubMenu>

						<SubMenu
							key="5"
							title={
								<span className="h6">
									<DownSquareOutlined />
									Brands
								</span>
							}>
							<div className="pb-2">
								{brands.current.map((name, i) => (
									<Radio
										className="pb-1 pl-4 pr-5 d-block"
										key={i}
										value={name}
										name={name}
										checked={brand === name}
										onClick={() => handleBrandClick(name)}>
										{name}
									</Radio>
								))}
							</div>
						</SubMenu>

						<SubMenu
							key="6"
							title={
								<span className="h6">
									<DownSquareOutlined />
									Colors
								</span>
							}>
							<div className="pb-2">
								{colors.current.map((name, i) => (
									<Radio
										className="pb-1 pl-4 pr-4 d-block"
										key={i}
										value={name}
										name={name}
										checked={color === name}
										onClick={() => handleColorClick(name)}>
										{name}
									</Radio>
								))}
							</div>
						</SubMenu>

						<SubMenu
							key="7"
							title={
								<span className="h6">
									<DownSquareOutlined />
									Shippings
								</span>
							}>
							<div className="pb-2">
								{shippings.current.map((name, i) => (
									<Radio
										className="pb-1 pl-4 pr-4 d-block"
										key={i}
										value={name}
										name={name}
										checked={shipping === name}
										onClick={() => handleShippingClick(name)}>
										{name}
									</Radio>
								))}
							</div>
						</SubMenu>
					</Menu>
				</div>

				<div className="col-md-9">
					<div className="row mt-3">
						{loading ? (
							<LoadingCard count={3} size="col-md-4" />
						) : products.length < 1 ? (
							<p>No products found</p>
						) : (
							products.map((product) => (
								<ProductCard
									key={product._id}
									product={product}
									size="col-md-4"
								/>
							))
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Shop;
