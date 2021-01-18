import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { SEARCH_QUERY } from '../../store/actionTypes';

const Search = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const { text } = useSelector((state) => state.search);

	const handleChange = ({ target }) => {
		dispatch({
			type: SEARCH_QUERY,
			payload: { text: target.value },
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		history.push(`/shop?${text}`);
	};

	return (
		<form className="form-inline m-2 m-lg-0" onSubmit={handleSubmit}>
			<input
				type="search"
				value={text}
				onChange={handleChange}
				className="form-control m-sm-2"
				placeholder="Search"
			/>
			<SearchOutlined onClick={handleSubmit} style={{ cursor: 'pointer' }} />
		</form>
	);
};

export default Search;
