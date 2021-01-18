import React, { useEffect, useState } from 'react';
import axios from '../../../server/axios';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import ProductCreateForm from './../../../components/forms/ProductCreateForm';
import FileUpload from './../../../components/forms/FileUpload';
import { LoadingOutlined } from '@ant-design/icons';

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

const ProductCreate = () => {
	const [values, setValues] = useState(initialState);
	const [loading, setLoading] = useState(false);
	const user = useSelector((state) => state.user);

	useEffect(() => {
		loadCategories();
	}, []);

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
			const res = await axios.createProduct(values, user.token);
			toast.success(`${res.data.title} is created`);
			setValues(initialState);
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
						<h4>Product create</h4>
					)}

					<div className="p-3">
						<FileUpload
							values={values}
							setValues={setValues}
							setLoading={setLoading}
						/>
					</div>
					<br />

					<ProductCreateForm
						onSubmit={handleSubmit}
						onChange={handleChange}
						onCategoryChange={handleCategoryChange}
						values={values}
						setValues={setValues}
						loading={loading}
					/>
				</div>
			</div>
		</div>
	);
};

export default ProductCreate;
