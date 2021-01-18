import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import StripeCheckout from '../components/stripe/StripeCheckout';

// loadStripe
const promise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const Payment = () => {
	return (
		<div className="container text-center">
			<h4>Compleate your purchase</h4>
			<Elements stripe={promise}>
				<div className="col-md-8 offset-md-2">
					<StripeCheckout />
				</div>
			</Elements>
		</div>
	);
};

export default Payment;
