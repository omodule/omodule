const omoduleChildNames = __omodule_childnames;

const omodule = {
    // route: {
    //     path: '/'
    // },
    route: (partialNextState, cb) => {
        import('./route/index.js').then(
            route => {
                cb(null, route.default);
            },
            error => cb(error || {})
        );
    },
    childOmodules: omoduleChildNames.map(omoduleName => {
        const child = require('./omodules/' + omoduleName + '/omodule');
        return child.default;
    })
};

export default omodule;
