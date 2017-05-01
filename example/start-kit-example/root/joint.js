console.log(omodule);
const all = ((r) => {
    return r.keys().map((key) => r(key).default);
})(require.context('./omodules/', true, /^\.\/((?!\/)[\s\S])+\/joint\.js$/))
