import React, { useEffect, useRef, useState } from 'react';
import { Badge, Image, Menu } from 'antd';
import {
	AppstoreOutlined,
	UserOutlined,
	UserAddOutlined,
	LogoutOutlined,
	ShoppingOutlined,
	ShoppingCartOutlined,
} from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import firebase from 'firebase';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from 'antd/lib/avatar/avatar';
import Search from '../forms/Search';
import { userLogout } from '../../store/actions/user';

const { SubMenu, Item } = Menu;

const Header = () => {
	const defaultPicture = useRef(
		'https://www.pphfoundation.ca/wp-content/uploads/2018/05/default-avatar.png'
	);
	const dispatch = useDispatch();
	const history = useHistory();
	const [current, setCurrent] = useState('home');
	const { user, cart } = useSelector((state) => ({ ...state }));

	useEffect(() => {
		const interval = setInterval(
			() => currentMenuSelector(history.location.pathname),
			200
		);

		return () => clearInterval(interval);
	}, [history.location.pathname]);

	const handleClick = ({ key }) => setCurrent(key);

	const currentMenuSelector = (pathName) => setCurrent(pathName);

	const logout = () => {
		firebase.auth().signOut();
		dispatch(userLogout());
		history.push('/login');
	};

	return (
		<Menu
			onClick={handleClick}
			selectedKeys={[current]}
			mode="horizontal"
			className="mb-4">
			<Item key="/" icon={<AppstoreOutlined />}>
				<Link to="/">Home</Link>
			</Item>

			<Item key="/shop" icon={<ShoppingOutlined />}>
				<Link to="/shop">Shop</Link>
			</Item>

			<Item key="/cart" icon={<ShoppingCartOutlined />}>
				<Link to="/cart">
					<Badge count={cart.length} offset={[9, 0]}>
						Cart
					</Badge>
				</Link>
			</Item>

			{!user && (
				<>
					<Item
						key="/register"
						icon={<UserAddOutlined />}
						className="float-right">
						<Link to="/register">Register</Link>
					</Item>

					<Item key="/login" icon={<UserOutlined />} className="float-right">
						<Link to="/login">Login</Link>
					</Item>
				</>
			)}

			{user && (
				<SubMenu
					key="sub"
					title={user.name}
					className="float-right"
					icon={
						<Avatar
							style={{
								border: '1px solid #1890FF',
								margin: '0 10px 0 0',
							}}
							src={
								<Image
									src={
										user.picture === 'no-image'
											? defaultPicture.current
											: user.picture
									}
								/>
							}
						/>
					}>
					{user.role === 'admin' ? (
						<>
							<Item key="/admin/dashboard">
								<Link to="/admin/dashboard">Dashboard</Link>
							</Item>
							<Item key="/user/history">
								<Link to="/user/history">History</Link>
							</Item>
						</>
					) : (
						<Item key="/user/history">
							<Link to="/user/history">History</Link>
						</Item>
					)}

					<Item onClick={logout} icon={<LogoutOutlined />}>
						Logout
					</Item>
				</SubMenu>
			)}

			<span className="float-right">
				<Search />
			</span>
		</Menu>
	);
};

export default Header;
