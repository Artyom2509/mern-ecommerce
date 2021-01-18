import React, { useEffect, useState } from 'react';
import AdminNav from './../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import axios from '../../../server/axios';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import CategoryForm from '../../../components/forms/CategoryForm';
import LocalSearch from '../../../components/forms/LocalSearch';

const SubCreate = () => {
	const [name, setName] = useState('');
	const [categories, setCategories] = useState([]);
	const [subs, setSubs] = useState([]);
	const [parent, setParent] = useState(null);
	const [loading, setLoading] = useState(false);
	const user = useSelector((state) => state.user);
	const [keyword, setKeyword] = useState('');

	useEffect(() => {
		loadCategories();
		loadSubs();
	}, []);

	const loadCategories = async () => {
		try {
			const res = await axios.getCategories();
			setCategories(res.data);
		} catch (error) {
			toast.error(error.message);
		}
	};

	const loadSubs = async () => {
		try {
			const res = await axios.getSubs();
			setSubs(res.data);
		} catch (error) {
			toast.error(error.message);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			const res = await axios.createSub(name, parent, user.token);
			setLoading(false);
			setName('');
			loadSubs();
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
				const res = await axios.removeSub(slug, user.token);
				toast.success(`${res.data.name} is removed`);
				setLoading(false);
				loadSubs();
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
						<h4>Create sub category</h4>
					)}

					<div className="form-group">
						<select
							name="category"
							className="form-control"
							onChange={(e) => setParent(e.target.value)}>
							<option>Please select parent category</option>
							{categories.length > 0 &&
								categories.map(({ name, _id }) => (
									<option key={_id} value={_id}>
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
						disabledButton={loading || name.length < 2 || !parent}
					/>

					<LocalSearch value={keyword} setValue={setKeyword} />

					<hr />
					<div className="col-md-5">
						{subs.filter(searched(keyword)).map(({ slug, name, _id }, i) => (
							<div className="alert alert-primary " key={_id}>
								<span className="text-secondary mr-3">{i + 1}&nbsp;</span>
								{name}
								<div className="float-right">
									<Link className="btn btn-sm" to={`/admin/sub/${slug}`}>
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

export default SubCreate;
