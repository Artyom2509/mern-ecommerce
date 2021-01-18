import React, { useEffect, useRef, useState } from 'react';
import { auth } from '../../server/firebase';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const ForgotPassword = ({ history }) => {
	const [email, setEmail] = useState('');
	const [loading, setLoading] = useState(false);
	const emailInput = useRef();
	const user = useSelector((state) => state.user);

	useEffect(() => {
		emailInput.current.focus();
		if (user && user.token) history.push('/');
	}, [user]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		const config = {
			url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL,
			handleCodeInApp: true,
		};

		try {
			await auth.sendPasswordResetEmail(email, config);
			toast.success('An email has been sent. Please check your inbox');
			setEmail('');
		} catch (error) {
			toast.error(error.message);
			setLoading(false);
		}
	};

	return (
		<div className="container col-md-6 offset-md-3 p-5">
			{loading ? (
				<h4 className="text-danger">Loading...</h4>
			) : (
				<h4>Forgot Password</h4>
			)}

			<form onSubmit={handleSubmit}>
				<input
					type="email"
					className="form-control"
					value={email}
					placeholder="Type your email"
					onChange={() => setEmail(emailInput.current.value)}
					ref={emailInput}
				/>
				<button className="btn btn-raised mt-3" disabled={!email}>
					Submit
				</button>
			</form>
		</div>
	);
};

export default ForgotPassword;
