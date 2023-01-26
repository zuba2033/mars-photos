import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider} from 'react-redux';

import App from './components/app/App';

import store from './store';

import "swiper/css/bundle";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);


