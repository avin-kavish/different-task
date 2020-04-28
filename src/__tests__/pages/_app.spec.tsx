import React from 'react'
import renderer from 'react-test-renderer'
import { shallow, mount } from 'enzyme'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

const fakeStore = createStore(state => state)
jest.mock('../../state/store', () => fakeStore)

import App from '../../pages/_app'

const Component = jest.fn(props => 'Test Render')

describe('<_App />', () => {
  it('should render unchanged', () => {
    const tree = renderer
      .create(<App Component={Component} pageProps={{}} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should add bootstrap from cdn', () => {
    const wrapper = shallow(<App Component={Component} pageProps={{}} />)

    const el = wrapper.find('link[rel="stylesheet"]')
    expect(el.prop('href')).toMatch(/bootstrap.*css$/)
  })

  it('should add favicon', () => {
    const wrapper = shallow(<App Component={Component} pageProps={{}} />)

    const el = wrapper.find('link[rel="icon"]')
    expect(el.prop('href')).toMatch(/favicon/)
  })

  it('should set document title', () => {
    const wrapper = shallow(<App Component={Component} pageProps={{}} />)

    expect(wrapper.find('title').text()).toBe('Different App')
  })

  it('should provide the redux store', () => {
    const wrapper = shallow(<App Component={Component} pageProps={{}} />)

    const reduxProvider = wrapper.find(Provider)
    expect(reduxProvider.prop('store')).toBe(fakeStore)
  })

  it('should render page Component and pass pageProps to it', () => {
    const fakeProps = { a: 1, b: 1 }
    const wrapper = shallow(<App Component={Component} pageProps={fakeProps} />)

    expect(wrapper.find(Component).props()).toEqual(fakeProps)
  })
})
