import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from '../../server/axios';

const CategoryList = () => {
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		getCategories();
	}, []);

	const getCategories = async () => {
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

	return (
		<>
			{loading ? (
				<h4 className="text-center">Loading ...</h4>
			) : (
				<div className="container mb-4">
					<div className="row text-center">
						{!loading &&
							categories.map(({ _id, name, slug }) => (
								<div
									key={_id}
									className="col btn btn-outlined btn-lg m-2 btn-raised btn-block">
									<Link to={`/category/${slug}`}>{name}</Link>
								</div>
							))}
					</div>
				</div>
			)}
		</>
	);
};

export default CategoryList;
