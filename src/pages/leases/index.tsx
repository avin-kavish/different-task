import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadLeases } from '../../state/features/leases'
import { RootState } from '../../state/store'
import { LeaseList } from '../../components'

export default function LeasesPage() {
  const dispatch = useDispatch()
  const leases = useSelector((s: RootState) => s.leases.list)

  useEffect(() => {
    dispatch(loadLeases())
  }, [])

  return (
    <div className="container pt-4">
      <h1>Leases</h1>
      <LeaseList list={leases || []} />
    </div>
  )
}
