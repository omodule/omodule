const route = {
    path: __omodule_foldername,
    getComponent: (nextState, cb) => {
        cb(null, require('../containers/BaseContainer').default);
    }
};

export default route;
