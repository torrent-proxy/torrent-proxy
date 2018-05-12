import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import App from './App';
import reducer from './reducers';


const store = createStore(reducer(), composeWithDevTools(applyMiddleware(thunk)));
store.subscribe(() => console.log('subscribe', store.getState()));

ReactDOM.render(
	<Provider store={ store }>
		<App />
	</Provider>,
	document.getElementById('root')
);
