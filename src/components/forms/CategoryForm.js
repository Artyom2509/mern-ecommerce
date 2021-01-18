import React, { useEffect, useRef } from 'react';

const CategoryForm = ({
	onSubmit,
	onChange,
	value,
	disabledInput,
	disabledButton,
	placeholder,
}) => {
	const nameInp = useRef();

	useEffect(() => {
		nameInp.current.focus();
	}, []);

	return (
		<form onSubmit={onSubmit}>
			<input
				type="text"
				ref={nameInp}
				placeholder={placeholder || ''}
				className="form-control"
				onChange={onChange}
				value={value || ''}
				disabled={disabledInput || false}
				required
			/>
			<button
				className="btn btn-outline-primary mt-2"
				disabled={disabledButton || false}>
				Save
			</button>
		</form>
	);
};

export default CategoryForm;
