import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { Lease } from '../../../models/Lease'

export const paymentScheduleSelector = createSelector(
  (state: RootState) => state.leaseDetails.lease,
  lease => {
    if (!lease) return null
    return Lease.computePaymentSchedule(lease)
  }
)
