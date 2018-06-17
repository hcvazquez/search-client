import './polyfills';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyRouterMiddleware, Router, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { useScroll } from 'react-router-scroll';
import config from 'config';
import store, { addReducers } from 'shared/state/store';
import Application from './app';
import routes from './routes';

console.info('[bootstrap] App config is', config);

// Track page views for this SPA
browserHistory.listen((location) => {
    if (window.ga) {
        window.ga('set', 'page', `${location.pathname + location.search}`);
        window.ga('send', 'pageview');
    }
});

// Setup routing
addReducers({ routing: routerReducer });
syncHistoryWithStore(browserHistory, store);

// Build our routes
const appRoutes = {
    path: '/',
    component: Application,
    childRoutes: routes,
};

// Render our app!
ReactDOM.render(
    <Provider store={ store }>
        <Router history={ browserHistory } routes={ appRoutes } render={ applyRouterMiddleware(useScroll()) }/>
    </Provider>,
    document.querySelector('#root')
);
