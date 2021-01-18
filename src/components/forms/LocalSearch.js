import React from 'react';

const LocalSearch = ({ placeholder, value, setValue }) => {
	const handleSearchChange = (e) => {
		e.preventDefault();

		setValue(e.target.value.toLowerCase());
	};

	return (
		<div className="pt-4 pb-4">
			<input
				type="search"
				placeholder={placeholder || 'Filter'}
				value={value}
				onChange={handleSearchChange}
				className="form-control mb-4"
			/>
		</div>
	);
};

export default LocalSearch;
