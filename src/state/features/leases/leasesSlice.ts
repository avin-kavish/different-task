import {
  createSlice,
  createAsyncThunk,
  SerializedError,
} from '@reduxjs/toolkit'
import { getLeases } from '../../../api/v1/leaseClient'
import { LeaseSummary } from '../../../models/Lease'

export const loadLeases = createAsyncThunk('leases/load', async _ =>
  getLeases()
)

export interface LeasesState {
  list: LeaseSummary[]
  error: SerializedError
}

// Mutable syntax can be used due to the `state` object being wrapped by immer.js.
// Ref: https://redux-toolkit.js.org/tutorials/intermediate-tutorial#mutable-update-logic
export default createSlice({
  name: 'leases',
  initialState: { list: null, error: null } as LeasesState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadLeases.pending, (state, action) => {
      state.error = null
    })
    builder.addCase(loadLeases.fulfilled, (state, action) => {
      state.error = null
      state.list = action.payload
    })
    builder.addCase(loadLeases.rejected, (state, action) => {
      state.error = action.error
    })
  },
})
