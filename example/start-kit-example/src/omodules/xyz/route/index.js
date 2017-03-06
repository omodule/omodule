const route = {
    path: __omodule_foldername,
    getComponent: (nextState, cb) => {
        import('../containers/BaseContainer').then(Container => cb(null, Container.default));
    },
    // childRoutes: [
    //     {
    //         path: 'detail',
    //         getComponent: (nextState, cb) => {
    //             import('../containers/DetailContainer').then(Container => {
    //                 cb(null, Container.default);
    //             });
    //         }
    //     }
    // ],
    getChildRoutes: (partialNextState, cb) => {
        cb(null, {
            path: 'async-detail',
            getComponent: (nextState, cb) => {
                import('../containers/DetailContainer').then(Container => {
                    cb(null, Container.default);
                });
            }
        })
    }
};
export default route
