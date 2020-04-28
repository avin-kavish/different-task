import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

jest.mock('../../../api/v1/leaseClient')

import reducer from '.'
import { LeasesState, loadLeases } from './leasesSlice'
import { MOCK_LEASE_SUMMARY } from '../../../__tests__/fixtures/leases'
import { getLeases } from '../../../api/v1/leaseClient'

describe('leases reducer', () => {
  it('should return initial state', () => {
    const nextState = reducer(undefined, {} as any)

    expect(nextState).toEqual<LeasesState>({
      list: null,
      error: null,
    })
  })

  it('should handle pending loading of leases', () => {
    const nextState = reducer(
      {
        list: MOCK_LEASE_SUMMARY,
        error: new Error('fake error'),
      },
      {
        type: 'leases/load/pending',
      }
    )

    expect(nextState).toEqual<LeasesState>({
      list: MOCK_LEASE_SUMMARY,
      error: null,
    })
  })

  it('should handle loading leases succesfully', () => {
    const nextState = reducer(
      {
        list: [],
        error: new Error('fake error'),
      },
      {
        type: 'leases/load/fulfilled',
        payload: MOCK_LEASE_SUMMARY,
      }
    )

    expect(nextState).toEqual<LeasesState>({
      list: MOCK_LEASE_SUMMARY,
      error: null,
    })
  })

  it('should handle failure to load leases', () => {
    const fakeError = new Error('failed to do stuff')

    const nextState = reducer(
      {
        list: MOCK_LEASE_SUMMARY,
        error: null,
      },
      {
        type: 'leases/load/rejected',
        error: fakeError,
      }
    )

    expect(nextState).toEqual<LeasesState>({
      list: MOCK_LEASE_SUMMARY,
      error: fakeError,
    })
  })
})

const mockStore = configureMockStore([thunk])

describe('leases actions', () => {
  it('should dispatch pending & fulfilled actions to load lease details', async () => {
    const store = mockStore()
    await store.dispatch(loadLeases() as any)

    const actions = store.getActions()
    expect(actions[0]).toHaveProperty('type', 'leases/load/pending')
    expect(actions[1]).toHaveProperty('type', 'leases/load/fulfilled')
    expect(actions[1]).toHaveProperty('payload', MOCK_LEASE_SUMMARY)
  })

  it('should dispatch pending & rejected actions when failing to load lease details', async () => {
    const fakeError = new Error('Wrekt')
    ;(getLeases as jest.Mock).mockImplementationOnce(() =>
      Promise.reject(fakeError)
    )

    const store = mockStore()
    await store.dispatch(loadLeases() as any)

    const actions = store.getActions()
    expect(actions[0].type).toEqual('leases/load/pending')
    expect(actions[1].type).toEqual('leases/load/rejected')
    expect(actions[1].error.name).toEqual(fakeError.name)
    expect(actions[1].error.message).toEqual(fakeError.message)
  })
})
