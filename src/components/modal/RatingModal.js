import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal } from 'antd';
import { StarOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { useHistory, useParams } from 'react-router';

const RatingModal = ({ children }) => {
	const [modalVisible, setModalVisible] = useState(false);
	const user = useSelector((state) => state.user);
	const history = useHistory();
	const { slug } = useParams();

	const handleModal = () => {
		if (user?.token) setModalVisible(true);
		else
			history.push({ pathname: '/login', state: { from: `/product/${slug}` } });
	};

	const onOkHandler = useCallback(() => {
		setModalVisible(false);
		toast('Thanks for your review. It will appear soon.');
	}, []);

	return (
		<>
			<div onClick={handleModal}>
				<StarOutlined className="text-danger" />
				<br /> {user ? 'Leave rating' : 'Login to Leave rating'}
			</div>

			<Modal
				title="Leave your rating"
				centered
				visible={modalVisible}
				onCancel={() => setModalVisible(false)}
				onOk={onOkHandler}>
				{children}
			</Modal>
		</>
	);
};

export default RatingModal;
