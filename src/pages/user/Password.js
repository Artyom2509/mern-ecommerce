import React, { useEffect, useRef, useState } from 'react';
import UserNav from '../../components/nav/UserNav';
import { auth } from './../../server/firebase';
import { toast } from 'react-toastify';

const Password = () => {
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const passInput = useRef();

	useEffect(() => {
		passInput.current.focus();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			await auth.currentUser.updatePassword(password);
			setLoading(false);
			setPassword('');
			toast.success('Password updated');
		} catch (error) {
			toast.error(error.message);
			setLoading(false);
		}
	};

	const passwordUpdateForm = () => (
		<form onSubmit={handleSubmit}>
			<div className="form-group">
				<input
					type="password"
					ref={passInput}
					className="form-control"
					value={password}
					disabled={loading}
					placeholder="Your password"
					onChange={() => setPassword(passInput.current.value)}
				/>
				<button
					className="btn btn-primary mt-2"
					disabled={!password || password.length < 6 || loading}>
					Submit
				</button>
			</div>
		</form>
	);

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-2">
					<UserNav />
				</div>

				<div className="col-md-4">
					{loading ? (
						<h4 className="text-danger">Loading</h4>
					) : (
						<h4>Password Update</h4>
					)}
					{passwordUpdateForm()}
				</div>
			</div>
		</div>
	);
};

export default Password;
