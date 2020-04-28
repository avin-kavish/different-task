import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../state/store'
import { loadLeaseDetails } from '../../state/features/lease-details'
import { paymentScheduleSelector } from '../../state/features/lease-details/paymentScheduleSelector'
import { format } from 'date-fns'
import { LeasePaymentsTable } from '../../components'

export default function LeaseDetailsPage() {
  const { query } = useRouter()
  const leaseId = query.leaseId as string
  const dispatch = useDispatch()
  const lease = useSelector((s: RootState) => s.leaseDetails.lease)
  const expectedPayments = useSelector(paymentScheduleSelector)

  // Webpack will drop this code in production.
  if (process.env.NODE_ENV === 'development') {
    console.log('lease', lease)
  }

  useEffect(() => {
    if (!leaseId) return

    dispatch(loadLeaseDetails(leaseId))
  }, [leaseId])

  return (
    <div className="container pt-4">
      <h1>Payment Schedule</h1>
      {lease && (
        <div className="row my-3">
          <div className="col">
            <label>From:</label>
            {' ' + format(lease?.startDate, 'MMMM, do yyyy')}
          </div>
          <div className="col">
            <label>To: </label>
            {' ' + format(lease?.endDate, 'MMMM, do yyyy')}
          </div>
          <div className="col">
            <label>Payment Day: </label>
            {' ' +
              lease.paymentDay[0].toUpperCase() +
              lease.paymentDay.slice(1)}
          </div>
        </div>
      )}
      <LeasePaymentsTable payments={expectedPayments} />
    </div>
  )
}
