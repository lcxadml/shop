import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import App from './App';

import store from './store'
import "normalize.css"
// import "@/assets/reset.css"
import "@/assets/css/reset.css"

ReactDOM.render(
<Provider store={store}>
    <App />
</Provider>, document.getElementById('root'));
