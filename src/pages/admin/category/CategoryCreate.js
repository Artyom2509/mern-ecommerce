import React, { useEffect, useState } from 'react';
import AdminNav from './../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import axios from '../../../server/axios';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import CategoryForm from '../../../components/forms/CategoryForm';
import LocalSearch from '../../../components/forms/LocalSearch';

const CategoryCreate = () => {
	const [name, setName] = useState('');
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(false);
	const user = useSelector((state) => state.user);
	const [keyword, setKeyword] = useState('');

	useEffect(() => {
		loadCategories();
	}, []);

	const loadCategories = async () => {
		try {
			const res = await axios.getCategories();
			setCategories(res.data);
		} catch (error) {
			toast.error(error.message);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			const res = await axios.createCategory(name, user.token);
			setLoading(false);
			setName('');
			loadCategories();
			toast.success(`${res.data.name} is created`);
		} catch (error) {
			if (error.message.includes('400')) toast.error(`Category exist`);
			else toast.error(error.message);
			setLoading(false);
		}
	};

	const handleRemove = async (slug) => {
		const answer = window.confirm('Delete?');
		setLoading(true);

		if (answer) {
			try {
				const res = await axios.removeCategory(slug, user.token);
				toast.success(`${res.data.name} is removed`);
				setLoading(false);
				loadCategories();
			} catch (error) {
				toast.error(error.message);
				setLoading(false);
			}
		}
	};

	const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-2">
					<AdminNav />
				</div>

				<div className="col">
					{loading ? (
						<h4 className="text-danger">Loading</h4>
					) : (
						<h4>Create category</h4>
					)}


					<CategoryForm
						onSubmit={handleSubmit}
						onChange={(e) => setName(e.target.value)}
						value={name}
						placeholder={'Category name'}
						disabledInput={loading}
						disabledButton={loading || name.length < 2}
					/>

					<LocalSearch value={keyword} setValue={setKeyword} />

					<hr />
					<div className="col-md-5">
						{categories
							.filter(searched(keyword))
							.map(({ slug, name, _id }, i) => (
								<div className="alert alert-primary " key={_id}>
									<span className="text-secondary mr-3">{i + 1}&nbsp;</span>
									{name}
									<div className="float-right">
										<Link className="btn btn-sm" to={`/admin/category/${slug}`}>
											<EditOutlined className="text-warning" />
										</Link>
										<span
											onClick={() => handleRemove(slug)}
											className="btn btn-sm">
											<DeleteOutlined className="text-danger" />
										</span>
									</div>
								</div>
							))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default CategoryCreate;
