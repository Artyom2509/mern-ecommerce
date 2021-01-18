import React, { useEffect, useRef, useState } from 'react';
import AdminNav from './../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import axios from '../../../server/axios';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CategoryForm from '../../../components/forms/CategoryForm';

const CategoryUpdate = ({ history }) => {
	const [name, setName] = useState('');
	const [loading, setLoading] = useState(false);
	const user = useSelector((state) => state.user);
	const { slug } = useParams();

	useEffect(() => {
		loadCategory();
	}, []);

	const loadCategory = async () => {
		try {
			const res = await axios.getCategory(slug);
			setName(res.data.name);
		} catch (error) {
			toast.error(error.message);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			const res = await axios.updateCategory(slug, name, user.token);
			setLoading(false);
			toast.success(`${res.data.name} is updatad`);
			history.push('/admin/category');
		} catch (error) {
			if (error.message.includes('400')) toast.error(`Category exist`);
			else toast.error(error.message);
			setLoading(false);
		}
	};

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-2">
					<AdminNav />
				</div>
				<div className="col">
					{loading ? (
						<h4 className="text-danger">Loading...</h4>
					) : (
						<h4>Update category</h4>
					)}

					<CategoryForm
						onSubmit={handleSubmit}
						onChange={(e) => setName(e.target.value)}
						value={name}
						placeholder={'Category name'}
						disabledInput={loading}
						disabledButton={loading || name.length < 2}
					/>
				</div>
			</div>
		</div>
	);
};

export default CategoryUpdate;
