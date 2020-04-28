/* istanbul ignore file */

/*
 * For TESTING ONLY
 */
export default (req, res) => {
  res.json({
    id: 'lease-b',
    start_date: '2018-05-12',
    end_date: '2018-11-13',
    rent: 454,
    frequency: 'weekly',
    payment_day: 'tuesday',
  })
}
