import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'antd';
import { auth, googleAuthProvider } from '../../server/firebase';
import { toast } from 'react-toastify';
import { GooglePlusOutlined, MailOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { LOGGED_IN_USER } from './../../store/actionTypes';
import { Link } from 'react-router-dom';
import axios from '../../server/axios';

const Login = ({ history }) => {
	const mailInput = useRef();
	const passInput = useRef();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);

	useEffect(() => {
		mailInput.current.focus();
		const intended = history.location.state;

		if (intended) return;
		if (user && user.token) history.push('/');
	}, [user]);

	const roleBasedRedirect = (res) => {
		const intended = history.location.state;

		if (intended) history.push(intended.from);
		else if (res.data.role === 'admin') history.push('/admin/dashboard');
		else history.push('/user/history');
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);

		try {
			const res = await auth.signInWithEmailAndPassword(email, password);
			await dispatchUser(res);
		} catch (error) {
			toast.error(error.message);
			setLoading(false);
		}
	};

	const googleLogin = async () => {
		setLoading(true);
		try {
			const res = await auth.signInWithPopup(googleAuthProvider);
			await dispatchUser(res);
		} catch (error) {
			toast.error(error.message);
			setLoading(false);
		}
	};

	const dispatchUser = async (resUser) => {
		const idTokenResult = await resUser.user.getIdTokenResult();
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

		toast.success(`You are logged in successfully!`);
		roleBasedRedirect(result);
	};

	const loginForm = () => (
		<form onSubmit={handleSubmit}>
			<div className="form-group">
				<input
					type="email"
					className="form-control"
					placeholder="Your email"
					value={email}
					onChange={() => setEmail(mailInput.current.value)}
					ref={mailInput}
				/>
			</div>

			<div className="form-group">
				<input
					type="password"
					className="form-control"
					placeholder="Your password"
					value={password}
					ref={passInput}
					onChange={() => setPassword(passInput.current.value)}
				/>
			</div>

			<Button
				onClick={handleSubmit}
				type="primary"
				className="mt-3"
				icon={<MailOutlined />}
				block
				shape="round"
				loading={loading}
				size="large"
				disabled={!email || password.length < 6}>
				Login with Email/Password
			</Button>
		</form>
	);

	return (
		<div className="container p-5">
			<div className="row">
				<div className="col-md-6 offset-md-3">
					{loading ? (
						<h4 className="text-danger">Loading...</h4>
					) : (
						<h4>Login</h4>
					)}

					{loginForm()}

					<Link to="/forgot/password" className="float-right text-danger mb-3">
						Forgot Password
					</Link>

					<Button
						onClick={googleLogin}
						type="danger"
						icon={<GooglePlusOutlined />}
						block
						loading={loading}
						shape="round"
						size="large">
						Login with Google
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Login;
