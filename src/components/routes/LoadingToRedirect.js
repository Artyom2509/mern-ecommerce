import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

const LoadingToRedirect = () => {
	const history = useHistory();
	const [count, setCount] = useState(5);

	useEffect(() => {
		const interval = setInterval(() => {
			setCount((count) => count - 1);
		}, 1000);

		if (count === 0) {
			toast.error('You are not authorized to access this page');
			history.push('/login');
		}

		return () => clearInterval(interval);
	}, [count]);

	return (
		<div className="container p-5 text-center">
			<h5 className="p-5">Redirecting you in {count} seconds</h5>
		</div>
	);
};

export default LoadingToRedirect;
