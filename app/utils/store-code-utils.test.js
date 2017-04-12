import {getStoreCodeFromIpAddress} from './store-code-utils';

const testStores = [
  { location: 'Lissone ', storeCode: '16', ipAddress: '10.126.33.129' },
  
  { location: 'Carugate ', storeCode: '43', ipAddress: '10.126.87.129' },
  
  { location: 'Romanina ', storeCode: '40', ipAddress: '10.126.81.129' },
  
  { location: 'Torino GC ', storeCode: '55', ipAddress: '10.126.111.129' },
]

describe('getStoreCodeFromIpAddress', () => {
  test('it get storeCode from ipAddress', () => {
    testStores.forEach(store => {
      expect(
        getStoreCodeFromIpAddress(store.ipAddress)
      ).toBe(
        store.storeCode
      );
    })
  })
})
