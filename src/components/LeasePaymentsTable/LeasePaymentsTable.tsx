import React from 'react'
import { format } from 'date-fns'
import { Payment } from '../../models/Payment'

export interface LeasePaymentsProps {
  payments?: Payment[]
}

export default function LeasePaymentsTable({ payments }: LeasePaymentsProps) {
  return (
    <table data-testid="LeasePaymentsTable" className="table">
      <thead>
        <tr>
          <th>From</th>
          <th>To</th>
          <th>Days</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {payments?.map(p => (
          <tr key={p.from.toISOString()}>
            <td>{formatDate(p.from)}</td>
            <td>{formatDate(p.to)}</td>
            <td>{p.days}</td>
            <td>{p.amount.toFixed(1)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

/* Helpers */
export const formatDate = date => format(date, 'MMMM, do yyyy')
