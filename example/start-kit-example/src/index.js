import 'babel-polyfill'
import { extractReducers, extractRoutes } from 'glue-module'
import gmodules from './gmodules/index'
import { syncHistoryWithStore } from 'react-router-redux'
import createStore from 'redux'
import { routerReducer } from 'react-router-redux'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router'

extractReducers(gmodules)(gmoduleReducers => {

    const rootReducer = combineReducers({
        routing: routerReducer,
        ...gmoduleReducers
    })

    const store = createStore(rootReducer, null)

    const syncHistory = syncHistoryWithStore(hashHistory, store)

    extractRoutes(gmodules, store)(gmoduleRoutes => {
        const rootRoute = {
            childRoutes: [{
                path: '/',
                component: require('./app/component/AppLayout'),
                childRoutes: [
                    ...gmoduleRoutes
                ]
            }]
        }

        const App = (props) => {
            render() {
                return (
                    <Provider store={store}>
                        <Router history={syncHistory} routes={rootRoute} />
                    </Provider>
                )
            }
        }

        render(
            <App />,
            document.getElementById('root')
        )
    })
})
