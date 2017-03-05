const route = {
    path: __omodule_foldername,
    getComponent: (nextState, cb) => {
        import('../containers/BaseContainer').then(BaseContainer => {
            cb(BaseContainer.default);
        });
    }
};

export default route;
