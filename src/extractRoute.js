import routeCombine from './routeCombine'
import {
    isSyncRoute,
    isAsyncRoute
} from './utils/common'

const extractRoute = (omodule, store) => cb => {
    routeCombine(omodule, store, (error, route, reducer) => {
        if (isSyncRoute(route)) {
            cb(error, route)
        } else if (isAsyncRoute(route)) {
            route(cb)
        }
    })
};

export default extractRoute;
