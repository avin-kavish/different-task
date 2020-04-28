import React from 'react'
import { renderPage } from '../../fixtures/PageTestWrapper'

jest.mock('next/router', () => ({
  useRouter() {
    return {
      query: { leaseId: 'lease-a' },
    }
  },
}))

jest.mock('../../../state/features/lease-details', () => ({
  loadLeaseDetails: jest.fn(leaseId => ({ type: 'no-op' })),
}))

import LeaseDetailsPage from '../../../pages/leases/[leaseId]'
import { loadLeaseDetails } from '../../../state/features/lease-details'

describe('/leases/[leaseId] page', () => {
  it('should render a heading', async () => {
    const { getByText } = renderPage(<LeaseDetailsPage />)

    expect(getByText(/Payment Schedule/).tagName).toBe('H1')
  })

  it('should render <LeasePaymentsTable />', async () => {
    const { getByTestId } = renderPage(<LeaseDetailsPage />)

    expect(getByTestId('LeasePaymentsTable')).toBeTruthy()
  })

  it('should dispatch `loadLeaseDetails`', async () => {
    ;((loadLeaseDetails as any) as jest.Mock).mockClear()

    const {} = renderPage(<LeaseDetailsPage />)

    expect(loadLeaseDetails).toBeCalledTimes(1)
    expect(loadLeaseDetails).toBeCalledWith('lease-a')
  })
})
