import omodules from './childrenOmodules/omodules.list'
import { SELF, INHERIT, GLOBAL } from 'o-module/asyncReducerType'


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
    asyncReducer: INHERIT,
    childOmodules: [
        detail,
        home
    ]
}

export const reducerNamespace = omodule.reducerNamespace

export default omodule
