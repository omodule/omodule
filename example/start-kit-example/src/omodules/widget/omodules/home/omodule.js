import omodules from './childrenOmodules/omodules.list'


const omodule = {
    reducerNamespace: 'widget',
    getReducer: (cb) => {
        import('./reducer').then(reducer => {
            cb(reducer.default)
        })
    },
    getRoute: (cb) => {
        import('./route').then(route => {
            cb(route.default)
        })
    },
    asyncReducer: true,
    childOmodules: [
        detail,
        home
    ]
}

export const reducerNamespace = omodule.reducerNamespace

export default omodule
