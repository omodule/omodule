export const namespace = __omodule_namespace;
const childOmoduleKeys = __omodule_childnames;

export default {
    reducer: {
        [`${namespace}`]: require('./reducer/index').default
    },
    route: (partialNextState, cb) => {
        import('./route/index').then(
            route => {
                cb(null, route.default);
            },
            error => cb(error || {})
        );
    },
};
