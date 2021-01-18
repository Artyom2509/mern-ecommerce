import React, { useEffect, useRef, useState } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import axios from '../../../server/axios';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CategoryForm from '../../../components/forms/CategoryForm';

const CategoryUpdate = ({ history }) => {
	const [name, setName] = useState('');
	const [parent, setParent] = useState('');
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(false);
	const user = useSelector((state) => state.user);
	const { slug } = useParams();

	const loadCategories = async () => {
		try {
			const res = await axios.getCategories();
			setCategories(res.data);
		} catch (error) {
			toast.error(error.message);
		}
	};

	useEffect(() => {
		loadSub();
		loadCategories();
	}, []);

	const loadSub = async () => {
		try {
			const res = await axios.getSub(slug);
			setName(res.data.name);
			setParent(res.data.parent);
		} catch (error) {
			toast.error(error.message);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			const res = await axios.updateSub(slug, name, parent, user.token);
			setLoading(false);
			toast.success(`${res.data.name} is updatad`);
			history.push('/admin/sub');
		} catch (error) {
			if (error.message.includes('400')) toast.error(`Sub category exist`);
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

					<div className="form-group">
						<select
							name="category"
							className="form-control"
							onChange={(e) => setParent(e.target.value)}>
							<option disabled>Please select parent category</option>
							{categories.length > 0 &&
								categories.map(({ name, _id }) => (
									<option key={_id} value={_id} selected={parent === _id}>
										{name}
									</option>
								))}
						</select>
					</div>

					<CategoryForm
						onSubmit={handleSubmit}
						onChange={(e) => setName(e.target.value)}
						value={name}
						placeholder={'Sub category name'}
						disabledInput={loading}
						disabledButton={loading || name.length < 2}
					/>
				</div>
			</div>
		</div>
	);
};

export default CategoryUpdate;
