import React, { useEffect, useRef, useState } from 'react';
import { auth } from '../../server/firebase';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const Register = ({ history }) => {
	const input = useRef(null);
	const [email, setEmail] = useState('');
	const user = useSelector((state) => state.user);

	useEffect(() => {
		input.current.focus();
		if (user && user.token) history.push('/');
	}, [user]);

	const handleSubmit = async (event) => {
		event.preventDefault();
		const config = {
			url: process.env.REACT_APP_AUTH_URL,
			handleCodeInApp: true,
		};

		try {
			await auth.sendSignInLinkToEmail(email, config);
			toast.success(
				`Email is send to ${email}. Click the link to complete your registration.`
			);
			localStorage.setItem('emailForSignIn', email);
			setEmail('');
		} catch (error) {
			toast.error(error.message);
		}
	};

	const registerForm = () => (
		<form onSubmit={handleSubmit}>
			<input
				type="email"
				className="form-control"
				value={email}
				placeholder="Your email"
				onChange={() => setEmail(input.current.value)}
				ref={input}
			/>
			<button type="submit" className="btn btn-raised mt-3">
				Register
			</button>
		</form>
	);

	return (
		<div className="container p-5">
			<div className="row">
				<div className="col-md-6 offset-md-3">
					<h4>Register</h4>
					{registerForm()}
				</div>
			</div>
		</div>
	);
};

export default Register;
