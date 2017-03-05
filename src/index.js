import extractRoute from './extractRoute'
import extractSyncReducer from './extractSyncReducer'
import { lazyReducerEnhencer } from 'lazy-reducer'

export default {
    extractRoute,
    extractSyncReducer,
    omoduleEnhencer: lazyReducerEnhencer
}
