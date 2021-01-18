import React from 'react';
import Jumbotron from '../components/cards/Jumbotron';
import NewArrivals from './../components/home/NewArrivals';
import BestSellers from './../components/home/BestSellers';
import CategoryList from '../components/category/CategoryList';
import SubsList from '../components/subs/SubsList';

const Home = () => {
	return (
		<>
			<div className="text-center font-weight-bold text-danger h1 jumbotron">
				<Jumbotron text={['Latest Products', 'New Arrivals', 'Best Sellers']} />
			</div>

			<h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
				New Arrivals
			</h4>
			<NewArrivals />

			<h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
				Best Sellers
			</h4>
			<BestSellers />

			<h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
				Categories list
			</h4>
			<CategoryList />
			
			<h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
				Subs list
			</h4>
			<SubsList />

			<div className="text-center font-weight-bold text-danger h1 jumbotron">
				<Jumbotron text={['Footer']} />
			</div>
		</>
	);
};

export default Home;
