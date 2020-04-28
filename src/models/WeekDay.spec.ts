import { toNativeDay, WeekDay } from './WeekDay'

describe('WeekDay', () => {
  describe('toNativeDay', () => {
    it('should turn Monday to 1', () => {
      expect(toNativeDay(WeekDay.Monday)).toBe(1)
    })

    it('should turn Tuesday to 2', () => {
      expect(toNativeDay(WeekDay.Tuesday)).toBe(2)
    })

    it('should turn Wednesday to 3', () => {
      expect(toNativeDay(WeekDay.Wednesday)).toBe(3)
    })

    it('should turn Thursday to 4', () => {
      expect(toNativeDay(WeekDay.Thursday)).toBe(4)
    })

    it('should turn Friday to 5', () => {
      expect(toNativeDay(WeekDay.Friday)).toBe(5)
    })

    it('should throw on unknown days', () => {
      expect(() => toNativeDay('Christmas' as any)).toThrow()
    })
  })
})
