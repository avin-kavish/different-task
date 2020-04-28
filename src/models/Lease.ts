import { WeekDay, toNativeDay } from './WeekDay'
import { PaymentFrequency, frequencyInDays } from './PaymentFrequency'
import { Payment } from './Payment'
import { add, isAfter, sub, differenceInDays } from 'date-fns'

export interface LeaseSummary {
  id: string
  tenant: string
}

export class Lease implements LeaseSummary {
  id: string

  tenant: string

  startDate: Date

  endDate: Date

  rent: number

  frequency: PaymentFrequency

  paymentDay: WeekDay

  static fromJSON(obj: any): Lease {
    return Object.assign(new Lease(), {
      id: obj.id,
      tenant: obj.tenant,
      startDate: new Date(obj.start_date),
      endDate: new Date(obj.end_date),
      rent: obj.rent,
      frequency: obj.frequency,
      paymentDay: obj.payment_day,
    })
  }

  // This method is static because instance methods do not play well with
  // immutability libraries.
  static computePaymentSchedule(lease: Lease) {
    const { startDate, endDate, paymentDay, frequency, rent } = lease

    let payment: Payment
    let nextDate: Date
    const payments: Payment[] = []
    do {
      const from = nextDate || startDate
      nextDate = findNextPaymentDate(from, endDate, paymentDay, frequency)
      payment = makePayment(from, nextDate, lease)

      payments.push(payment)
      if (isSameDate(payment.to, endDate)) {
        break
      }
    } while (true)

    return payments
  }
}

/* Helpers */
const isSameDate = (a: Date, b: Date) => a.getTime() === b.getTime()

function findNextPaymentDate(
  startDate: Date,
  endDate: Date,
  paymentDay: WeekDay,
  paymentFrequency: PaymentFrequency
): Date {
  const dayNumber = toNativeDay(paymentDay)
  const frequency = frequencyInDays(paymentFrequency)
  const startDay = startDate.getDay()

  // If first payment day falls on the start date of the lease, the
  // second day would occur normally in frequency, so we add the
  // frequency and return it, if it's before the end date. If the end
  // date is before this, the end date will be the second payment date.
  if (startDay === dayNumber) {
    const nextDate = add(startDate, { days: frequency })
    return isAfter(nextDate, endDate) ? endDate : nextDate
  }

  const dayDiff = dayNumber - startDay
  // If the difference is positive, it means the payment day is upcoming, so we
  // add the difference to the start date, if it's negative, i.e. the day is in
  // the past within that week, we add (7 + diff) to the start date.
  const nextDate = add(startDate, { days: dayDiff > 0 ? dayDiff : 7 + dayDiff })
  return isAfter(nextDate, endDate) ? endDate : nextDate
}

function makePayment(from: Date, nextDate: Date, lease: Lease) {
  const { endDate, frequency, rent } = lease

  const to = isSameDate(nextDate, endDate)
    ? endDate
    : sub(nextDate, { days: 1 })

  const days = differenceInDays(to, from) + 1
  const amount = (rent / frequencyInDays(frequency)) * days

  return { from, to, days, amount }
}
