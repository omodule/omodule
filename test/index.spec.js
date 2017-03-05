import omodule from '../src'

describe('#API', () => {
    it('shoud has function `extractSyncReducer`', () => {
        expect(typeof omodule.extractSyncReducer).toBe('function')
    })
    it('shoud has functon `extractRoute`', () => {
        expect(typeof omodule.extractRoute).toBe('function')
    })
})
