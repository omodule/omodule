const childOmoduleKeys = __omodule_childOmoduleKeys__;

const omodule = {
    route: {
        path: '/'
    },
    childOmodules: childOmoduleKeys.map(omoduleName => {
        const child = require('./omodules/' + omoduleName + '/omodule');
        return child.default;
    });
};

export default omodule;
