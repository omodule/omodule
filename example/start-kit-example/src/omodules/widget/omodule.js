export const namespace = __omodule_namespace;
const childnames = __omodule_childnames;
const name = __omodule_flodername;

const omodule = {
    reducer: cb => {
        import('./reducer').then(reducerFun => {
            const reducer = {};
            reducer[namespace] = reducerFun.default;
            cb(null, reducer);
        }, error => cb(error || {}));
    },
    route: cb => {
        import('./route').then(route => {
            cb(null, route.default);
        }, error => cb(error || {}));
    },
    childOmodules: childOmoduleKeys.map(omoduleName => {
        const child = require('./omodules/' + omoduleName + '/omodule');
        return child.default;
    })
};

export default omodule;
