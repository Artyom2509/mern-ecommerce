import React from 'react';
import { Link } from 'react-router-dom';

const ProductListItems = ({
	price,
	category,
	subs,
	shipping,
	color,
	brand,
	quantity,
	sold,
}) => {
	return (
		<ul className="list-group">
			<li className="list-group-item">
				Price
				<span className="label label-default label-pill pull-xs-right">
					{price}
				</span>
			</li>

			<li className="list-group-item">
				Category
				<Link
					to={`/category/${category?.slug}`}
					className="label label-default label-pill pull-xs-right">
					{category?.name}
				</Link>
			</li>

			<li className="list-group-item">
				Sub Categories
				{subs &&
					subs.map(({ _id, slug, name }) => (
						<Link key={_id}
							to={`/sub/${slug}`}
							className="label label-default label-pill pull-xs-right">
							{name}
						</Link>
					))}
			</li>

			<li className="list-group-item">
				Color
				<span className="label label-default label-pill pull-xs-right">
					{color}
				</span>
			</li>

			<li className="list-group-item">
				Shipping
				<span className="label label-default label-pill pull-xs-right">
					{shipping}
				</span>
			</li>

			<li className="list-group-item">
				Brand
				<span className="label label-default label-pill pull-xs-right">
					{brand}
				</span>
			</li>

			<li className="list-group-item">
				Available
				<span className="label label-default label-pill pull-xs-right">
					{quantity}
				</span>
			</li>

			<li className="list-group-item">
				Sold
				<span className="label label-default label-pill pull-xs-right">
					{sold}
				</span>
			</li>
		</ul>
	);
};

export default ProductListItems;
