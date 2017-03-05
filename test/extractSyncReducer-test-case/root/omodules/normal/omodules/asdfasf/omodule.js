export const namespace = __omodule_namespace;

export default {
    reducer: {
        [`${namespace}`]: (state = {}, action) => {
            return state;
        }
    },
    route: {
        path: '/'
    },
    childOmodules: []
};
