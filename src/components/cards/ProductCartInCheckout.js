import {
	CheckCircleOutlined,
	CloseCircleOutlined,
	CloseOutlined,
} from '@ant-design/icons';
import { InputNumber } from 'antd';
import React, { useRef, useState } from 'react';
import ModalImage from 'react-modal-image';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
	actionUpdateInCart,
	actionRemoveInCart,
} from '../../store/actions/cart';

const ProductCartInCheckout = ({ product, idx }) => {
	const colorsRef = useRef(['Black', 'Brown', 'Silver', 'White', 'Blue']);
	const [selectColor, setSelectColor] = useState(product.color);
	const [count, setCount] = useState(product.count);
	const dispatch = useDispatch();

	const handleColorChange = (e) => {
		const color = e.target.value;
		setSelectColor(color);
		dispatch(actionUpdateInCart(product, { color: color }));
	};

	const handleCountChange = (value) => {
		setCount(value);
		dispatch(actionUpdateInCart(product, { count: value }));
	};

	const handleProductDelete = () => {
		dispatch(actionRemoveInCart(product._id));
	};

	return (
		<tr>
			<td>{idx + 1}</td>
			<td>
				{product.images.length ? (
					<ModalImage
						className="small-img"
						small={product.images[0].url}
						large={product.images[0].url}
						alt={product.title}
					/>
				) : (
					<img
						className="small-img"
						src={process.env.REACT_APP_DEFAULT_IMG}
						alt={product.title}
					/>
				)}
			</td>
			<td>
				<b>
					<Link to={`/product/${product.slug}`}>{product.title}</Link>
				</b>
			</td>
			<td>${product.price}</td>
			<td>{product.brand}</td>
			<td className="text-center">
				<InputNumber
					min={1}
					max={product.quantity}
					defaultValue={count}
					onChange={handleCountChange}
				/>
			</td>
			<td>
				<select
					onChange={handleColorChange}
					name="color"
					value={selectColor}
					className="form-control">
					{colorsRef.current.map((color) => (
						<option key={color} value={color}>
							{color}
						</option>
					))}
				</select>
			</td>
			<td className="text-center">
				{product.shipping === 'Yes' ? (
					<CheckCircleOutlined
						style={{ fontSize: '20px' }}
						className="text-success"
					/>
				) : (
					<CloseCircleOutlined
						style={{ fontSize: '20px' }}
						className="text-danger"
					/>
				)}
			</td>
			<td className="text-center">
				<CloseOutlined
					style={{ fontSize: '21px' }}
					className="text-danger pointer"
					onClick={handleProductDelete}
				/>
			</td>
		</tr>
	);
};

export default ProductCartInCheckout;
