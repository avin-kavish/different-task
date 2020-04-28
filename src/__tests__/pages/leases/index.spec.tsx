import React from 'react'
import LeasesPage from '../../../pages/leases'
import { renderPage } from '../../fixtures/PageTestWrapper'
import { waitFor } from '@testing-library/react'

jest.mock('../../../state/features/leases')

import { loadLeases } from '../../../state/features/leases'

describe('/leases page', () => {
  it('should render a heading', async () => {
    const { getByText } = renderPage(<LeasesPage />)

    expect(getByText(/Leases/).tagName).toBe('H1')
  })

  it('should render the <LeaseList />', () => {
    const { getByTestId } = renderPage(<LeasesPage />)

    expect(getByTestId('LeaseList')).toBeTruthy()
  })

  it('should dispatch load actions on mount', async () => {
    const utils = renderPage(<LeasesPage />)

    await waitFor(() => expect(loadLeases).toBeCalled())
  })
})
