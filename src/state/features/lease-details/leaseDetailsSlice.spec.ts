import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

jest.mock('../../../api/v1/leaseClient')

import reducer from '.'
import { LeaseDetailsState, loadLeaseDetails } from './leaseDetailsSlice'
import { Lease } from '../../../models/Lease'
import { MOCK_LEASE } from '../../../__tests__/fixtures/leases'
import { getLeaseDetails } from '../../../api/v1/leaseClient'

describe('leaseDetails reducer', () => {
  it('should return initial state', () => {
    const nextState = reducer(undefined, {} as any)

    expect(nextState).toEqual<LeaseDetailsState>({
      lease: null,
      loadError: null,
    })
  })

  it('should clear error when pending lease details', () => {
    const nextState = reducer(
      {
        lease: null,
        loadError: new Error(),
      },
      {
        type: 'lease-details/load/pending',
      }
    )

    expect(nextState).toEqual<LeaseDetailsState>({
      lease: null,
      loadError: null,
    })
  })

  it('should load lease details succesfully', () => {
    const fakeLease = Object.assign(new Lease(), { id: 'lease-fake' })

    const nextState = reducer(
      {
        lease: null,
        loadError: null,
      },
      {
        type: 'lease-details/load/fulfilled',
        payload: fakeLease,
      }
    )

    expect(nextState).toEqual<LeaseDetailsState>({
      lease: fakeLease,
      loadError: null,
    })
  })

  it('should accept error when failing to load lease details', () => {
    const fakeLease = Object.assign(new Lease(), { id: 'lease-fake-3' })
    const fakeError = new Error('epic fail')

    const nextState = reducer(
      {
        lease: fakeLease,
        loadError: null,
      },
      {
        type: 'lease-details/load/rejected',
        error: fakeError,
      }
    )

    expect(nextState).toEqual<LeaseDetailsState>({
      lease: fakeLease,
      loadError: fakeError,
    })
  })
})

const mockStore = configureMockStore([thunk])

describe('leaseDetails actions', () => {
  it('should dispatch pending & fulfilled actions to load lease details', async () => {
    const store = mockStore()
    await store.dispatch(loadLeaseDetails('lease-a') as any)

    const actions = store.getActions()
    expect(actions[0]).toHaveProperty('type', 'lease-details/load/pending')
    expect(actions[1]).toHaveProperty('type', 'lease-details/load/fulfilled')
    expect(actions[1]).toHaveProperty('payload', MOCK_LEASE)
  })

  it('should dispatch pending & rejected actions when failing to load lease details', async () => {
    const fakeError = new Error('Wrekt')
    ;(getLeaseDetails as jest.Mock).mockImplementationOnce(() =>
      Promise.reject(fakeError)
    )

    const store = mockStore()
    await store.dispatch(loadLeaseDetails('lease-a') as any)

    const actions = store.getActions()
    expect(actions[0].type).toEqual('lease-details/load/pending')
    expect(actions[1].type).toEqual('lease-details/load/rejected')
    expect(actions[1].error.name).toEqual(fakeError.name)
    expect(actions[1].error.message).toEqual(fakeError.message)
  })
})
