import React, { useCallback, useEffect, useState } from 'react';
import axios from '../../../server/axios';
import AdminNav from '../../../components/nav/AdminNav';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import ProductUpdateForm from '../../../components/forms/ProductUpdateForm';
import { LoadingOutlined } from '@ant-design/icons';
import FileUpload from './../../../components/forms/FileUpload';

const initialState = {
	title: '',
	description: '',
	price: 0,
	categories: [],
	category: '',
	subs: [],
	shippings: ['Yes', 'No'],
	shipping: '',
	quantity: 0,
	images: [],
	colors: ['Black', 'Brown', 'Silver', 'White', 'Blue'],
	brands: ['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'ASUS'],
	color: '',
	brand: '',
};

const ProductUpdate = ({ match, history }) => {
	const [values, setValues] = useState(initialState);
	const [selectedCategory, setSelectedCategory] = useState({});
	const [loading, setLoading] = useState(false);
	const user = useSelector((state) => state.user);

	useEffect(() => {
		loadCategories();
		loadProduct();
	}, []);

	const loadProduct = async () => {
		try {
			const res = await axios.getProduct(match.params.slug);
			await setValues((values) => ({
				...values,
				...res.data,
				category: res.data.category._id,
				subs: res.data.subs.map((s) => s._id),
			}));
			setSelectedCategory({
				[res.data.category._id]: res.data.subs.map((s) => s._id),
			});
		} catch (error) {
			toast.error(error.message);
		}
	};

	const loadCategories = async () => {
		try {
			const res = await axios.getCategories();
			setValues((values) => ({ ...values, categories: res.data }));
		} catch (error) {
			toast.error(error.message);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const res = await axios.updateProduct(
				match.params.slug,
				values,
				user.token
			);
			toast.success(`${res.data.title} is updated`);
			history.push('/admin/products');
		} catch (error) {
			error.response.data.error.forEach((error) => toast.error(error));
		}
	};

	const handleChange = ({ target: { name, value } }) => {
		setValues((values) => ({ ...values, [name]: value }));
	};

	const handleCategoryChange = ({ target: { value } }) => {
		setValues((values) => ({ ...values, category: value, subs: [] }));
	};

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-2">
					<AdminNav />
				</div>

				<div className="col-md-10">
					{loading ? (
						<LoadingOutlined className="text-danger h1" />
					) : (
						<h4>Product update</h4>
					)}

					<div className="p-3">
						<FileUpload
							values={values}
							setValues={setValues}
							setLoading={setLoading}
						/>
					</div>
					<br />
					<ProductUpdateForm
						onSubmit={handleSubmit}
						onChange={handleChange}
						values={values}
						setValues={setValues}
						onCategoryChange={handleCategoryChange}
						setSelectedCategory={setSelectedCategory}
						selectedCategory={selectedCategory}
						loading={loading}
					/>
				</div>
			</div>
		</div>
	);
};

export default ProductUpdate;
