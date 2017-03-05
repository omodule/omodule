export const namespace = __omodule_namespace;
const childOmoduleKeys = __omodule_childnames;

export default {
    reducer: {
        [`${namespace}`]: (state = {}, action) => {
            return state;
        }
    },
    route: require('./route/index').default,
    childOmodules: childOmoduleKeys.map((key) => {
        return require(`./omodules/${key}/omodule`).default
    })
};
