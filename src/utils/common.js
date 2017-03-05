import isObjectLike from 'lodash/isObjectLike';
import warning from './warning.js';

export const NODE_ENV = 'production';

export const isSyncReducer = reducer => {
    return isObjectLike(reducer);
};

export const isLazyReducer = reducer => {
    return typeof reducer === 'function';
};

export const unexpectedOmoduleWarning = omodule => {
    // if (NODE_ENV !== 'production') {
    //     warning('warningMessage');
    // }
};

export const isSyncRoute = route => {
    return isObjectLike(route);
};

export const isAsyncRoute = route => {
    return typeof route === 'function';
};
