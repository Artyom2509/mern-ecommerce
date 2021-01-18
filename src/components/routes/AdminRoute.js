import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingToRedirect from './LoadingToRedirect';
import axios from '../../server/axios';
import { toast } from 'react-toastify';

const AdminRoute = ({ children, ...rest }) => {
	const user = useSelector((state) => state.user);
	const [ok, setOk] = useState(false);

	useEffect(() => {
		if (user && user.token) {
			axios
				.currentAdmin(user.token)
				.then((res) => {
					setOk(true);
				})
				.catch((error) => {
					setOk(false);
				});
		}
	}, [user]);

	return ok ? <Route {...rest} /> : <LoadingToRedirect />;
};

export default AdminRoute;
