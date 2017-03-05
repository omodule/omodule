import {
    isLazyReducer,
    isSyncRoute,
    isAsyncRoute,
    unexpectedOmoduleWarning,
    NODE_ENV
} from './utils/common';
import { attach } from 'lazy-reducer';

const initRoute = {
    path: '/'
};

const combineAsyncRoutes = (arrayRoutes = []) => (partialNextState, callback) => {
    var length = arrayRoutes.length;
    var values = [];

    if (length === 0) return callback(null, values);

    var isDone = false, doneCount = 0;

    function done(index, error, value) {
        if (isDone) return;

        if (error) {
            isDone = true;
            callback(error);
        } else {
            values[index] = value;

            isDone = ++doneCount === length;

            if (isDone) {
                callback(null, values);
            }
        }
    }

    arrayRoutes.forEach(function(routeFun, index) {
        routeFun(partialNextState, (error, route) => {
            done(index, error, route);
        });
    });
};

/*
    parentHook = function (error, childRoute, reducer) {

    }
 */
const routeCombine = (omodule, store, parentHook) => {
    let {
        reducer,
        route,
        childOmodules
    } = omodule || {};

    childOmodules = childOmodules || [];

    if (!route && childOmodules.length > 0) {
        if (NODE_ENV !== 'production') {
            warning(`The branch omodule, ${omodule}, must has a route!`);
        }
        route = { ...initRoute };
    }

    if (childOmodules.length > 0) {
        const length = childOmodules.length;
        const childRoutes = [];
        const childReducers = [];

        let isDone = false, doneCount = 0;

        const hook = index => (error, childRoute, childReducer) => {
            if (isDone) {
                return;
            }
            childRoutes[index] = childRoute;
            childReducers[index] = childReducer;

            isDone = ++doneCount === length;

            if (isDone) {
                const childAsyncRoutes = childRoutes.filter(isAsyncRoute);

                const childSyncRoutes = childRoutes.filter(isSyncRoute);

                const childLazyReducers = childReducers.filter(isLazyReducer).reduce((
                    acc,
                    reducer
                ) => {
                    return { ...acc, ...reducer };
                }, {});

                const work = (routeObj, childAsyncRoutes, childSyncRoutes, childLazyReducers) => {
                    if (childAsyncRoutes.length > 0) {
                        const originGetChildRoutes = routeObj.__omodule_getChildRoutes ||
                            routeObj.getChildRoutes ||
                            [];
                        routeObj.__omodule_getChildRoutes = originGetChildRoutes;
                        if (routeObj.__omodule_getChildRoutes.length > 0) {
                            routeObj.getChildRoutes = combineAsyncRoutes([
                                routeObj.__omodule_getChildRoutes,
                                ...childAsyncRoutes
                            ]);
                        } else {
                            routeObj.getChildRoutes = combineAsyncRoutes(childAsyncRoutes);
                        }
                    }

                    if (childSyncRoutes.length > 0) {
                        routeObj.__omodule_childRoutes = routeObj.__omodule_childRoutes ||
                            routeObj.childRoutes ||
                            [];
                        routeObj.childRoutes = [
                            ...routeObj.__omodule_childRoutes,
                            ...childSyncRoutes
                        ];
                    }

                    let lazyReducer = {};

                    if (isLazyReducer(routeObj.reducer)) {
                        lazyReducer = { ...routeObj.reducer, ...childLazyReducers };
                    } else {
                        lazyReducer = childLazyReducers;
                    }

                    if (Object.keys(lazyReducer) > 0) {
                        routeObj = attach(routeObj, store, lazyReducer);
                    }

                    return routeObj;
                };

                if (isAsyncRoute(route)) {
                    const originRoute = route.__omodule_originRoute || route;
                    const wrapRouteCB = (partialNextState, callback) => {
                        originRoute(partialNextState, (error, routeObj) => {
                            if (error) {
                                callback(error, routeObj);
                            } else {
                                callback(
                                    null,
                                    work(
                                        routeObj,
                                        childAsyncRoutes,
                                        childSyncRoutes,
                                        childLazyReducers
                                    )
                                );
                            }
                        });
                    };
                    route = wrapRouteCB;
                    route.__omodule_originRoute = originRoute;
                } else if (isSyncRoute(route)) {
                    route = work(route, childAsyncRoutes, childSyncRoutes, childLazyReducers);
                }

                parentHook(null, route, null);
            }
        };

        childOmodules.forEach((childOmodule, index) => {
            routeCombine(childOmodule, store, hook(index));
        });
    } else if (route) {
        parentHook(null, route, null);
    } else if (isLazyReducer(reducer) && !route) {
        parentHook(null, null, reducer);
    } else {
        parentHook(null, null, null);
    }
};

export default routeCombine;
