import React from 'react'
import { mount, shallow } from 'enzyme'
import LeaseList from './LeaseList'
import { Anchor } from '../Anchor'
import { MOCK_LEASE_SUMMARY } from '../../__tests__/fixtures/leases'

describe('<LeaseList /> - Units', () => {
  test('it should render 0 <Anchor /> for an empty list', () => {
    const wrapper = shallow(<LeaseList list={[]} />)

    expect(wrapper.find('.list-group')).toExist()
    expect(wrapper.find(Anchor)).toHaveLength(0)
  })

  test('it should render an <Anchor /> for each list item', () => {
    const wrapper = shallow(<LeaseList list={MOCK_LEASE_SUMMARY} />)
    expect(wrapper.find(Anchor)).toHaveLength(MOCK_LEASE_SUMMARY.length)
  })
})

describe('<LeaseList /> - Integration', () => {
  test('it should render a non-empty list successfully', () => {
    const wrapper = mount(<LeaseList list={MOCK_LEASE_SUMMARY} />)

    const listItems = wrapper.find('a.list-group-item')
    expect(listItems).toHaveLength(MOCK_LEASE_SUMMARY.length)

    listItems.forEach((li, i) => {
      expect(li.text()).toBe(MOCK_LEASE_SUMMARY[i].tenant)
    })
  })
})
