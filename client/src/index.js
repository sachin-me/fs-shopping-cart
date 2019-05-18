import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from "react-router-dom";
import { renderRoutes } from 'react-router-config'
import rootReducer from './store/reducers';
import store from './store/store';
import Header from './components/Header';
import routes from '../routes';
import Layout from './components/Layout';

const store = createStore( window.REDUX_DATA );

const jsx = (
	<Provider store={store}>
		<Router>
			<Layout />
		</Router>
	</Provider>
)

const app = document.getElementById('root');

ReactDOM.hydrate(
	jsx, app 
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
