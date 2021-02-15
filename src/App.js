import React, { useEffect, lazy, Suspense } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import './App.css';
import './stripe.css';
import 'react-quill/dist/quill.snow.css';
import 'react-datepicker/dist/react-datepicker.css';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { auth } from './server/firebase';
import { useDispatch } from 'react-redux';
import { actionLoadWishlist, loggedInUser } from './store/actions/user';
import axios from './server/axios';
import { LoadingOutlined } from '@ant-design/icons';
// Lazy
const UserRoute = lazy(() => import('./components/routes/UserRoute'));
const Drawer = lazy(() => import('./components/drawer/Drawer'));
const AdminRoute = lazy(() => import('./components/routes/AdminRoute'));
const Header = lazy(() => import('./components/nav/Header'));
const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));
const Home = lazy(() => import('./pages/Home'));
const RegisterComplete = lazy(() => import('./pages/auth/RegisterComplete'));
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'));
const History = lazy(() => import('./pages/user/History'));
const Password = lazy(() => import('./pages/user/Password'));
const Wishlist = lazy(() => import('./pages/user/Wishlist'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const CategoryCreate = lazy(() =>
	import('./pages/admin/category/CategoryCreate')
);
const CategoryUpdate = lazy(() =>
	import('./pages/admin/category/CategoryUpdate')
);
const SubCreate = lazy(() => import('./pages/admin/sub/SubCreate'));
const SubUpdate = lazy(() => import('./pages/admin/sub/SubUpdate'));
const ProductCreate = lazy(() => import('./pages/admin/product/ProductCreate'));
const AllProducts = lazy(() => import('./pages/admin/product/AllProducts'));
const ProductUpdate = lazy(() => import('./pages/admin/product/ProductUpdate'));
const Product = lazy(() => import('./pages/Product'));
const CategoryHome = lazy(() => import('./pages/category/CategoryHome'));
const SubHome = lazy(() => import('./pages/sub/SubHome'));
const Shop = lazy(() => import('./pages/Shop'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const CreateCoupon = lazy(() => import('./pages/admin/coupon/CreateCoupon'));
const Payment = lazy(() => import('./pages/Payment'));

// App
const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(async (user) => {
			if (user) {
				const idTokenResult = await user.getIdTokenResult();
				const res = await axios.currentUser(idTokenResult.token);

				dispatch(loggedInUser(res.data, idTokenResult.token));
				dispatch(actionLoadWishlist());
			}
		});

		return () => unsubscribe();
	}, [dispatch]);

	return (
		<Suspense
			fallback={
				<div
					className="col jumbotron text-danger font-weight-bold h1 text-center p-5"
					style={{ height: '100vh' }}>
					REACT REDUX EC
					<LoadingOutlined />
					MMERCE
				</div>
			}>
			<Header />
			<ToastContainer />
			<Drawer />
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/register" component={Register} />
				<Route exact path="/register/complete" component={RegisterComplete} />
				<Route exact path="/forgot/password" component={ForgotPassword} />
				<Route exact path="/product/:slug" component={Product} />
				<Route exact path="/category/:slug" component={CategoryHome} />
				<Route exact path="/sub/:slug" component={SubHome} />
				<Route exact path="/shop" component={Shop} />
				<Route exact path="/cart" component={Cart} />

				<UserRoute exact path="/user/history" component={History} />
				<UserRoute exact path="/user/password" component={Password} />
				<UserRoute exact path="/user/wishlist" component={Wishlist} />
				<UserRoute exact path="/checkout" component={Checkout} />
				<UserRoute exact path="/payment" component={Payment} />

				<AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
				<AdminRoute exact path="/admin/category" component={CategoryCreate} />
				<AdminRoute exact path="/admin/product" component={ProductCreate} />
				<AdminRoute exact path="/admin/products" component={AllProducts} />
				<AdminRoute exact path="/admin/sub" component={SubCreate} />
				<AdminRoute path="/admin/category/:slug" component={CategoryUpdate} />
				<AdminRoute exact path="/admin/sub/:slug" component={SubUpdate} />
				<AdminRoute exact path="/admin/coupons" component={CreateCoupon} />
				<AdminRoute
					exact
					path="/admin/product/:slug"
					component={ProductUpdate}
				/>
			</Switch>
		</Suspense>
	);
};

export default App;
