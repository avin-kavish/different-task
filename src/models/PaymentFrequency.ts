export enum PaymentFrequency {
  Weekly = 'weekly',
  Fortnightly = 'fortnightly',
  Monthly = 'monthly',
}

export const frequencyInDays = (freq: PaymentFrequency) => {
  switch (freq) {
    case PaymentFrequency.Weekly:
      return 7
    case PaymentFrequency.Fortnightly:
      return 14
    case PaymentFrequency.Monthly:
      return 28
    default:
      throw new Error(`Unhandled Payment Frequency - ${freq}`)
  }
}
