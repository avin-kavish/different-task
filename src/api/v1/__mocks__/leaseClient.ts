import {
  MOCK_LEASE_SUMMARY,
  MOCK_LEASE,
} from '../../../__tests__/fixtures/leases'

export const getLeases = jest.fn(() => Promise.resolve(MOCK_LEASE_SUMMARY))

export const getLeaseDetails = jest.fn((leaseId: string) =>
  Promise.resolve(MOCK_LEASE)
)
