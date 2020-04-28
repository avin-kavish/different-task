import React from 'react'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { render, fireEvent, screen } from '@testing-library/react'
import { RootState } from '../../state/store'

const mockStoreFactory = configureMockStore<RootState>([thunk])
export const mockStore = mockStoreFactory({
  leaseDetails: { lease: null, loadError: null },
  leases: { error: null, list: null },
})

export const PageTestWrapper = ({ children, store = mockStore }) => (
  <Provider store={store}>{children}</Provider>
)

export function renderPage(ui, { store = mockStore, ...renderOptions } = {}) {
  return render(ui, { wrapper: PageTestWrapper, ...renderOptions })
}
