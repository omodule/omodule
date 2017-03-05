const route = {
    path: 'widget',
    getComponent: (nextState, cb) => {
        import('../containers/BaseContainer').then(Container => cb(Container.default))
    },
    childRoutes: [{
        path: 'detail',
        getComponent: (nextState, cb) => {
            import('../containers/DetailContainer').then(Container => {
                cb(Container.default)
            })
        }
    }]
}
