import { Badge, Button, Drawer } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionRemoveInCart } from '../../store/actions/cart';
import { actionCloseDrawer } from '../../store/actions/drawer';

const SideDrawer = () => {
	const { drawer, cart } = useSelector((state) => state);
	const dispatch = useDispatch();

	const handleDrawerClose = () => dispatch(actionCloseDrawer());

	const deleteProductHandler = (id) => dispatch(actionRemoveInCart(id));

	return (
		<Drawer
			className="text-center"
			title={`Cart / ${cart.length} Products`}
			visible={drawer}
			onClose={handleDrawerClose}>
			{cart.map(({ title, _id, images, count }) => (
				<div key={_id} className="row mb-4">
					<div className="col">
						<Badge
							count="X"
							onClick={() => deleteProductHandler(_id)}
							className="pointer">
							<div className="drawer-img">
								<img
									className="full-img"
									src={images[0]?.url || process.env.REACT_APP_DEFAULT_IMG}
									alt={title}
								/>
							</div>

							<div className="bg-secondary text-light">
								{title} x {count}
							</div>
						</Badge>
					</div>
				</div>
			))}

			<Link to="/cart" onClick={handleDrawerClose}>
				<Button className="btn btn-primary btn-rasied">Go to Cart</Button>
			</Link>
		</Drawer>
	);
};

export default SideDrawer;
