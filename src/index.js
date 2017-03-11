import innerExtractRoute from './extractRoute';
import innerextractSyncReducer from './extractSyncReducer';
import { lazyReducerEnhancer } from 'lazy-reducer';

export const omoduleEnhancer = lazyReducerEnhancer;
export const extractSyncReducer = innerextractSyncReducer;
export const extractRoute = innerExtractRoute;
