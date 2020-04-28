import React from 'react'
import { mount } from 'enzyme'
import { Anchor } from './Anchor'
import Link from 'next/link'

describe('Anchor component', () => {
  test('it should render successfully', () => {
    const wrapper = mount(<Anchor href="/" />)

    expect(wrapper.find(Anchor)).toExist()
    expect(wrapper.find(Link)).toExist()
    expect(wrapper.find('a')).toExist()
  })

  // We don't have to actually assert navigation events as that is
  // provided by Next.js and native HTML. We are only checking that
  // the relevant components are rendered properly.
  test('it should support client-side & server-side navigation', () => {
    const href = '/leases/[leaseId]'
    const as = '/leases/lease-a'
    const wrapper = mount(<Anchor href={href} as={as} />)

    expect(wrapper.find(Link)).toHaveProp('href', href)
    expect(wrapper.find(Link)).toHaveProp('as', as)

    expect(wrapper.find('a')).toHaveProp('href', as)
  })
})
