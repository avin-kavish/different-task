import restClient from '../restClient'
import { Lease, LeaseSummary } from '../../models/Lease'

export const getLeases = () =>
  restClient.get<any[]>('/v1/leases').then(res => res.data as LeaseSummary[])

export const getLeaseDetails = (leaseId: string) =>
  restClient.get(`/v1/leases/${leaseId}`).then(res => Lease.fromJSON(res.data))
