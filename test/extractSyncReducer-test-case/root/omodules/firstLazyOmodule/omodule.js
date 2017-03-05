export const namespace = __omodule_namespace;

export default {
    reducer: cb => {
        cb(null, {
            [`${namespace}`]: (state = {}, action) => {
            }
        })
    },
    route: {
        path: '/'
    },
    childOmodules: []
};
