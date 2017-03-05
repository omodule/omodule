const route = {
    path: __omodule_foldername,
    getComponent: (nextState, cb) => {
        cb(null, require('../containers/AsyncCounter').default);
    }
};

export default route;
