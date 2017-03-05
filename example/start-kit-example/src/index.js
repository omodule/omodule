import 'babel-polyfill'
import { omoduleEnhencer } from 'omodule'
import extractSyncReducer from '../../../src/extractSyncReducer'
import extractRoute from '../../../src/extractRoute'
import omodule from './app/omodule'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import { render } from 'react-dom'
import { hashHistory } from 'react-router'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import React from 'react'
import createLogger from 'redux-logger';



const syncReducer = extractSyncReducer(omodule)
console.log(syncReducer);
const rootReducer = combineReducers({
    routing: routerReducer,
    ...syncReducer
})

const store = createStore(
    rootReducer,
    {},
    compose(applyMiddleware(createLogger()), omoduleEnhencer(rootReducer))
);

const syncHistory = syncHistoryWithStore(hashHistory, store);

const omoduleRoute = extractRoute(omodule, store)
console.log(omoduleRoute);
const rootRoute = {
    path: '/',
    childRoutes: [omoduleRoute]
}

const App = () => {
    return (
        <Provider store={store}>
            <Router history={syncHistory} routes={rootRoute} />
        </Provider>
    )
}

render(
    <App />,
    document.getElementById('root')
)
