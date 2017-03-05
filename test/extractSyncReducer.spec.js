import extractSyncReducer from '../src/extractSyncReducer';

describe('extractSyncReducer', () => {
    it('should exrtract a reducer object with only `sync reducer`', () => {
        const normalOmodule = require(
            './extractSyncReducer-test-case/root/omodule.js'
        ).default;

        console.log(normalOmodule);
        const syncReducer = extractSyncReducer(normalOmodule);
        console.log(syncReducer);
    });
});
