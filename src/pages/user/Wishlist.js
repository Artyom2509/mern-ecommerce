import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import UserNav from '../../components/nav/UserNav';
import {
	actionLoadWishlist,
	actionRemoveFromWishlist,
} from '../../store/actions/user';

const Wishlist = () => {
	const { wishlist } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	useEffect(() => dispatch(actionLoadWishlist()), []);

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-2">
					<UserNav />
				</div>

				<div className="col-md-5">
					<h4>Wishlist</h4>

					{wishlist.map(({ _id, slug, title }) => (
						<div key={_id} className="alert alert-secondary p-4">
							<Link to={`/product/${slug}`} className="h6">{title}</Link>
							<span
								onClick={() => dispatch(actionRemoveFromWishlist(_id))}
								className="btn btn-small float-right">
								Remove
							</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Wishlist;
