import React, { useEffect, useRef, useState } from 'react';
import { auth } from '../../server/firebase';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { LOGGED_IN_USER } from './../../store/actionTypes';
import axios from '../../server/axios';

const RegisterComplete = ({ history }) => {
	const passInput = useRef(null);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useDispatch();

	useEffect(() => {
		passInput.current.focus();
		setEmail((email) => (email = localStorage.getItem('emailForSignIn')));
		toast('Please enter a password!');
	}, []);

	const handleSubmit = async (event) => {
		event.preventDefault();
		// validation
		if (!email || !password) {
			toast.error('Email and Password is required');
			return false;
		}
		if (password.length < 6) {
			toast.error('Password must be at least 6 characters long');
			return false;
		}

		try {
			const res = await auth.signInWithEmailLink(email, window.location.href);
			if (res.user.emailVerified) {
				// remove user email from localStorage
				localStorage.removeItem('emailForSignIn');

				// get user id token
				const user = auth.currentUser;
				await user.updatePassword(password);
				const idTokenResult = await user.getIdTokenResult();

				// redux store
				const result = await axios.createOrUpdateUser(idTokenResult.token);

				dispatch({
					type: LOGGED_IN_USER,
					user: {
						name: result.data.name,
						email: result.data.email,
						token: idTokenResult.token,
						role: result.data.role,
						picture: result.data.picture,
						_id: result.data._id,
					},
				});

				// redirect
				history.push('/');
			}
		} catch (error) {
			toast.error(error.message);
		}
	};

	const completeRegisterForm = () => (
		<form onSubmit={handleSubmit}>
			<input type="email" className="form-control" value={email} disabled />
			<input
				type="password"
				className="form-control mt-2"
				value={password}
				onChange={() => setPassword(passInput.current.value)}
				placeholder="Password"
				ref={passInput}
			/>
			<button type="submit" className="btn btn-raised mt-3">
				Register complete
			</button>
		</form>
	);

	return (
		<div className="container p-5">
			<div className="row">
				<div className="col-md-6 offset-md-3">
					<h4>Complete the registration</h4>
					{completeRegisterForm()}
				</div>
			</div>
		</div>
	);
};

export default RegisterComplete;
