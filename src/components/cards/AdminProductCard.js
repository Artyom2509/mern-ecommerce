import React, { useRef } from 'react';
import { Card } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Meta from 'antd/lib/card/Meta';
import { Link } from 'react-router-dom';

const AdminProductCard = ({ product, handleDelete }) => {
	const productRef = useRef(product);
	const { title, images, description, slug } = productRef.current;

	return (
		<div className="col-md-3 mb-3">
			<Card
				cover={
					<img
						className="p-2"
						alt={title}
						src={images[0]?.url || process.env.REACT_APP_DEFAULT_IMG}
					/>
				}
				actions={[
					<Link to={`/admin/product/${slug}`}>
						<EditOutlined key="edit" className="text-warning" />
					</Link>,
					<DeleteOutlined
						key="ellipsis"
						className="text-danger"
						onClick={() => handleDelete(slug)}
					/>,
				]}>
				<Meta
					title={`${product.title} - $${product.price}`}
					description={
						description.length > 30
							? description.substr(0, 30) + '...'
							: description
					}
				/>
			</Card>
		</div>
	);
};

export default AdminProductCard;
