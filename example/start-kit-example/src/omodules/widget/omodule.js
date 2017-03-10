export const namespace = __omodule_namespace;
const childnames = __omodule_childnames;
console.log(childnames);
console.log(__omodule_namespace);

const omodule = {
    reducer: cb => {
        import('./reducer').then(
            reducerFun => {
                const reducer = {};
                reducer[namespace] = reducerFun.default;
                cb(null, reducer);
            },
            error => cb(error || {})
        );
    },
    route: (partialNextState, cb) => {
        import('./route/index').then(
            route => {
                cb(null, route.default);
            },
            error => cb(error || {})
        );
    },
    childOmodules: childnames.map(omoduleName => {
        const child = require('./omodules/' + omoduleName + '/omodule').default;
        return child;
    })
};

export default omodule;
