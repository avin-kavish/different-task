import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from '@reduxjs/toolkit'
import { getLeaseDetails } from '../../../api/v1/leaseClient'
import { Lease } from '../../../models/Lease'

export const loadLeaseDetails = createAsyncThunk(
  'lease-details/load',
  async (leaseId: string) => getLeaseDetails(leaseId)
)

export interface LeaseDetailsState {
  lease: Lease
  loadError: SerializedError
}

// `state` can by mutated directly because it is wrapped in immer.js.
// Ref: https://redux-toolkit.js.org/tutorials/intermediate-tutorial#mutable-update-logic
export default createSlice({
  name: 'lease-details',
  initialState: { lease: null, loadError: null } as LeaseDetailsState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadLeaseDetails.pending, (state, action) => {
      state.loadError = null
    })
    builder.addCase(loadLeaseDetails.fulfilled, (state, action) => {
      state.lease = action.payload
    })
    builder.addCase(loadLeaseDetails.rejected, (state, action) => {
      state.loadError = action.error
    })
  },
})
