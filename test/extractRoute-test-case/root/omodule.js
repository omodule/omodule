export const namespace = __omodule_namespace;
const childOmoduleKeys = __omodule_childnames;

export default {
    reducer: {
        [`${namespace}`]: (state = {}, action) => {
            return state;
        }
    },
    route: {
        path: '/'
    },
    childOmodules: childOmoduleKeys.map((key) => {
        return require(`./omodules/${key}/omodule`).default
    })
};
