import React, { useMemo } from 'react';
import StarRatings from 'react-star-ratings';

const AverageRating = ({ productId, ratings, size = [30, 5] }) => {
	const showAverage = useMemo(() => {
		if (ratings) {
			const totalReduced = ratings.reduce((acc, rate) => acc + rate.star, 0);
			return (totalReduced * 5) / (ratings.length * 5);
		}
	}, [ratings]);

	return (
		<div className="text-center">
			{ratings?.length > 0 ? (
				<>
					<StarRatings
						rating={showAverage}
						starRatedColor="#F44336"
						numberOfStars={5}
						name={productId}
						starDimension={`${size[0]}px`}
						starSpacing={`${size[1]}px`}
						isSelectable={true}
					/>
					&nbsp;({ratings?.length || 0})
				</>
			) : (
				<h6>No rating yet</h6>
			)}
		</div>
	);
};

export default AverageRating;
