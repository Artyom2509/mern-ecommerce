import React from 'react';
import Resizer from 'react-image-file-resizer';
import { useSelector } from 'react-redux';
import axios from '../../server/axios';
import { toast } from 'react-toastify';
import { Avatar, Badge } from 'antd';

const FileUpload = ({ values, setValues, setLoading }) => {
	const user = useSelector((state) => state.user);

	const fileUploadAndResize = (e) => {
		let files = [...e.target.files];
		let uploadedFiles = values.images;
		setLoading(true);

		if (files) {
			files.forEach((file) =>
				Resizer.imageFileResizer(
					file,
					720,
					720,
					'JPEG',
					100,
					0,
					async (uri) => {
						try {
							const res = await axios.updoadFiles(uri, user.token);
							uploadedFiles.push(res.data);
							setLoading(false);
							setValues((values) => ({ ...values, images: uploadedFiles }));
						} catch (error) {
							toast.error(error.message);
							setLoading(false);
						}
					},
					'base64'
				)
			);
		}
	};

	const handleImageRemove = (public_id) => async () => {
		setLoading(true);

		try {
			const res = await axios.removeFile(public_id, user.token);
      console.log('handleImageRemove -> res', res)
			let filteredFiles = values.images.filter(
				(item) => item.public_id !== public_id
			);
			setValues((values) => ({ ...values, images: filteredFiles }));
			setLoading(false);
		} catch (error) {
			toast.error(error.message);
			setLoading(false);
		}
	};

	return (
		<>
			<div className="row mb-2">
				{values.images &&
					values.images.map(({ url, public_id }) => (
						<Badge
							count={'X'}
							key={public_id}
							onClick={handleImageRemove(public_id)}
							style={{
								cursor: 'pointer',
							}}>
							<Avatar
								shape="square"
								size={150}
								style={{
									border: '1px solid #3C3C3C',
									borderRadius: '5%',
								}}
								className="ml-3"
								src={url}
							/>
						</Badge>
					))}
			</div>

			<div className="row">
				<label className="btn btn-primary">
					Choose File
					<input
						type="file"
						multiple
						hidden
						accept="images/*"
						onChange={fileUploadAndResize}
					/>
				</label>
			</div>
		</>
	);
};

export default FileUpload;
