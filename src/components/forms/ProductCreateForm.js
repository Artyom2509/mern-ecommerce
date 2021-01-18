import React, { useEffect, useState } from 'react';
import axios from '../../server/axios';
import { Select } from 'antd';

const { Option } = Select;

const ProductCreateForm = ({
	onSubmit,
	onChange,
	values,
	setValues,
	onCategoryChange,
	loading,
}) => {
	const {
		title,
		description,
		price,
		shippings,
		quantity,
		colors,
		brands,
		category,
		subs,
		categories,
	} = values;

	const [allSubs, setAllSubs] = useState([]);

	const getSubs = async (id) => {
		const res = await axios.getCategorySubs(id);
		setAllSubs(res.data ?? []);
	};

	useEffect(() => {
		getSubs(category);
	}, [category]);

	return (
		<form onSubmit={onSubmit}>
			<div className="form-group">
				<label>Title</label>
				<input
					type="text"
					name="title"
					value={title}
					onChange={onChange}
					className="form-control"
				/>
			</div>

			<div className="form-group">
				<label>Description</label>
				<input
					type="text"
					name="description"
					value={description}
					onChange={onChange}
					className="form-control"
				/>
			</div>

			<div className="form-group">
				<label>Price</label>
				<input
					type="number"
					name="price"
					value={price}
					onChange={onChange}
					className="form-control"
				/>
			</div>

			<div className="form-group">
				<label>Shipping</label>
				<select name="shipping" onChange={onChange} className="form-control">
					<option>Please select shipping</option>
					{shippings.map((opt) => (
						<option key={opt} value={opt}>
							{opt}
						</option>
					))}
				</select>
			</div>

			<div className="form-group">
				<label>Color</label>
				<select name="color" onChange={onChange} className="form-control">
					<option>Please select color</option>
					{colors.map((opt) => (
						<option key={opt} value={opt}>
							{opt}
						</option>
					))}
				</select>
			</div>

			<div className="form-group">
				<label>Brand</label>
				<select name="brand" onChange={onChange} className="form-control">
					<option>Please select brand</option>
					{brands.map((opt) => (
						<option key={opt} value={opt}>
							{opt}
						</option>
					))}
				</select>
			</div>

			<div className="form-group">
				<label>Quantity</label>
				<input
					type="number"
					name="quantity"
					value={quantity}
					onChange={onChange}
					className="form-control"
				/>
			</div>

			<div className="form-group">
				<label>Category</label>
				<select className="form-control" onChange={onCategoryChange}>
					<option value={''}>Please select category</option>
					{categories.length > 0 &&
						categories.map(({ name, _id }) => (
							<option key={_id} value={_id}>
								{name}
							</option>
						))}
				</select>
			</div>

			{category.length > 0 && (
				<div className="form-group">
					<label>Sub categories</label>
					<Select
						mode="multiple"
						style={{ width: '100%' }}
						placeholder="Please select sub categories"
						value={subs}
						onChange={(value) =>
							setValues((values) => ({ ...values, subs: value }))
						}>
						{allSubs.length > 0 &&
							allSubs.map(({ name, _id }) => (
								<Option key={_id} value={_id}>
									{name}
								</Option>
							))}
					</Select>
				</div>
			)}

			<button disabled={loading} className="btn btn-outline-info">
				Save
			</button>
		</form>
	);
};

export default ProductCreateForm;
