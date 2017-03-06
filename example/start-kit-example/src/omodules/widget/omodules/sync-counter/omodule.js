export const namespace = __omodule_namespace;
const childOmoduleKeys = __omodule_childnames;

export default {
    reducer: {
        [`${namespace}`]: require('./reducer/index').default
    },
    route: require('./route/index.js').default,
};
