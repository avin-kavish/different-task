import store, { RootState } from './store'

describe('store', () => {
  it('should be a redux store', () => {
    expect(store).toHaveProperty('dispatch')
    expect(store).toHaveProperty('getState')
  })

  it('should have initial state of', () => {
    expect(store.getState()).toEqual<RootState>({
      leases: { error: null, list: null },
      leaseDetails: { lease: null, loadError: null },
    })
  })
})
