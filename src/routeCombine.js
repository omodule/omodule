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
                        if (!routeObj.hasBuildGetChildRoutes) {

                            // change routeObj.childRoutes and childSyncRoutes to `function`
                            // if a route has routeObj.childRoutes, routeObj.getChildRoutes will be no work.
                            const syncRoutes = [
                                ...(routeObj.childRoutes || []),
                                ...childSyncRoutes
                            ].reduce(
                                (acc, route) => {
                                    const f = (partialNextState, cb) => {
                                        cb(null, route);
                                    };
                                    return [...acc, f];
                                },
                                []
                            );
                            delete routeObj.childRoutes

                            routeObj.hasBuildChildRoutes = true;

                            if (routeObj.getChildRoutes) {
                                routeObj.getChildRoutes = combineAsyncRoutes([
                                    routeObj.getChildRoutes,
                                    ...syncRoutes,
                                    ...childAsyncRoutes
                                ]);
                            } else {
                                routeObj.getChildRoutes = combineAsyncRoutes([
                                    ...syncRoutes,
                                    ...childAsyncRoutes
                                ]);
                            }
                            routeObj.hasBuildGetChildRoutes = true;
                        }
                    }

                    if (childSyncRoutes.length > 0) {
                        if (!routeObj.hasBuildChildRoutes) {
                            routeObj.childRoutes = [
                                ...(routeObj.childRoutes || []),
                                ...childSyncRoutes
                            ];
                            routeObj.hasBuildChildRoutes = true;
                        }
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
                    const originRoute = route;
                    const wrapRouteCB = (() => {
                        let isDown = false;
                        if (isDown) {
                            return route;
                        } else {
                            isDown = true;
                            return (partialNextState, callback) => {
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
                        }
                    })();
                    route = wrapRouteCB;
                } else if (isSyncRoute(route)) {
                    route = (() => {
                        let isDown = false;
                        if (isDown) {
                            return route;
                        } else {
                            isDown = true;
                            return work(
                                route,
                                childAsyncRoutes,
                                childSyncRoutes,
                                childLazyReducers
                            );
                        }
                    })();
                }

                parentHook(null, route, null);
            }
        };

        childOmodules.forEach((childOmodule, index) => {
            routeCombine(childOmodule, store, hook(index));
        });
    } else if (route) {
        route = (() => {
            let isDown = false;
            if (isDown) {
                return route;
            } else {
                if (isLazyReducer(reducer)) {
                    if (isSyncRoute(route)) {
                        return attach(route, store, reducer);
                    } else if (isAsyncRoute(route)) {
                        const originRoute = route;
                        return (partialNextState, callback) => {
                            originRoute(partialNextState, (error, routeObj) => {
                                if (error) {
                                    callback(error, routeObj);
                                } else {
                                    callback(error, attach(routeObj, store, reducer));
                                }
                            });
                        };
                    }
                }
                return route;
            }
        })();

        parentHook(null, route, null);
    } else if (isLazyReducer(reducer) && !route) {
        parentHook(null, null, reducer);
    } else {
        parentHook(null, null, null);
    }
};

export default routeCombine;
