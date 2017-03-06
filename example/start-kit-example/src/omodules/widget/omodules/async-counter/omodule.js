export const namespace = __omodule_namespace;
const childOmoduleKeys = __omodule_childnames;

export default {
    reducer: cb => {
        import('./reducer/index').then(reducerFun => {
            const reducer = {};
            reducer[namespace] = reducerFun.default;
            cb(null, reducer);
        });
    },
    route: (partialNextState, cb) => {
        import('./route/index').then(
            route => {
                cb(null, route.default);
            },
            error => cb(error || {})
        );
    },
    // childOmodules: childOmoduleKeys.map(key => {
    //     return require(`./omodules/${key}/omodule`).default;
    // })
};
