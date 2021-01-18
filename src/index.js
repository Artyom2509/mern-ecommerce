import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import 'antd/dist/antd.css';
import './server/firebase';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider as ReduxStoreProvider } from 'react-redux';
import rootReducer from './store';
import thunk from 'redux-thunk';

const composeEnhancers =
	(typeof window !== 'undefined' &&
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
	compose;

// store
const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(thunk))
);

const app = (
	<ReduxStoreProvider store={store}>
		<Router>
			<App />
		</Router>
	</ReduxStoreProvider>
);

ReactDOM.render(app, document.getElementById('root'));
