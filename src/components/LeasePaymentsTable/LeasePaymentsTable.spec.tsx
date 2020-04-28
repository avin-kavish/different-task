import React from 'react'
import { shallow } from 'enzyme'
import LeasePaymentsTable, { formatDate } from './LeasePaymentsTable'
import { Payment } from '../../models/Payment'

const randomValue = array => array[Math.floor(Math.random() * array.length)]

const MOCK_DATA = Array.from({ length: 10 }).map(
  (_, i) =>
    ({
      from: new Date(),
      to: new Date(),
      days: randomValue([7, 14, 28]),
      amount: Math.random() * 1000,
    } as Payment)
)

describe('<LeasePaymentsTable />', () => {
  it('should render an empty table', () => {
    const wrapper = shallow(<LeasePaymentsTable />)

    expect(wrapper.find('table.table')).toExist()
    expect(wrapper.find('thead')).toExist()
    expect(wrapper.find('tbody')).toExist()
    expect(wrapper.find('tbody tr')).not.toExist()
  })

  it('should render a populated table with correct cell values', () => {
    const wrapper = shallow(<LeasePaymentsTable payments={MOCK_DATA} />)

    expect(wrapper.find('table.table')).toExist()
    expect(wrapper.find('thead')).toExist()
    expect(wrapper.find('tbody')).toExist()

    const rows = wrapper.find('tbody tr')
    expect(rows).toHaveLength(MOCK_DATA.length)

    rows.forEach((r, i) => {
      const cellContent = r.find('td').map(d => d.text())

      expect(cellContent[0]).toBe(formatDate(MOCK_DATA[i].from))
      expect(cellContent[1]).toBe(formatDate(MOCK_DATA[i].to))
      expect(cellContent[2]).toBe(String(MOCK_DATA[i].days))
      expect(cellContent[3]).toBe(MOCK_DATA[i].amount.toFixed(1))
    })
  })
})
