import { configureStore } from '@reduxjs/toolkit'
import leasesReducer from './features/leases'
import leaseDetailsReducer from './features/lease-details'
import thunk from 'redux-thunk'

export type RootState = ReturnType<typeof store.getState>

const store = configureStore({
  reducer: {
    leases: leasesReducer,
    leaseDetails: leaseDetailsReducer,
  },
  middleware: [thunk],
})

export default store
