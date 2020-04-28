import React from 'react'
import { Anchor } from '..'
import { LeaseSummary } from '../../models/Lease'

export interface LeaseListProps {
  list: LeaseSummary[]
}

export default function LeaseList({ list }: LeaseListProps) {
  return (
    <div data-testid="LeaseList" className="list-group">
      {list.map(l => (
        <Anchor
          key={l.id}
          className="list-group-item list-group-item-action"
          href="/leases/[leaseId]"
          as={`/leases/${l.id}`}
        >
          {l.tenant}
        </Anchor>
      ))}
    </div>
  )
}
