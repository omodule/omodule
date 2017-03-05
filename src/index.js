import innerExtractRoute from './extractRoute';
import innerextractSyncReducer from './extractSyncReducer';
import { lazyReducerEnhencer } from 'lazy-reducer';

export const omoduleEnhencer = lazyReducerEnhencer;
export const extractSyncReducer = innerextractSyncReducer;
export const extractRoute = innerExtractRoute;
