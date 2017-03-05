import routeCombine from './routeCombine';
import { isSyncRoute, isAsyncRoute } from './utils/common';

const extractRoute = (omodule, store) => {
    let omoduleRoute, omoduleError;

    return {
        path: '/',
        getChildRoutes: (partialNextState, cb) => {
            if (omoduleRoute || omoduleError) {
                return cb(omoduleError, [omoduleRoute]);
            }
            routeCombine(omodule, store, (error, route, reducer) => {
                if (isSyncRoute(route)) {
                    omoduleRoute = route;
                    omoduleError = error;
                    cb(error, [route]);
                } else if (isAsyncRoute(route)) {
                    route(partialNextState, (error, route) => {
                        omoduleRoute = route;
                        omoduleError = error;
                        cb(error, [route]);
                    });
                }
            });
        }
    };
};

export default extractRoute;
