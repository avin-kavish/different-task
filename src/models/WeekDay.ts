export enum WeekDay {
  Monday = 'monday',
  Tuesday = 'tuesday',
  Wednesday = 'wednesday',
  Thursday = 'thursday',
  Friday = 'friday',
}

export const toNativeDay = (day: WeekDay) => {
  switch (day) {
    case WeekDay.Monday:
      return 1
    case WeekDay.Tuesday:
      return 2
    case WeekDay.Wednesday:
      return 3
    case WeekDay.Thursday:
      return 4
    case WeekDay.Friday:
      return 5
    default:
      throw new Error('Unknown Day')
  }
}
