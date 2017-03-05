import extractRoute from '../src/extractRoute'
describe('#extractRoute', () => {
    it('should exrtract a route', () => {

        const omodule = require('./extractRoute-test-case/root/omodule').default
        extractRoute(omodule, {})((error, route, reducer) => {
            console.log(route);
            console.log(route.childRoutes[0].childRoutes);
        })
    });
})
