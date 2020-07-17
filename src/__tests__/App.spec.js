import React from 'react'
import renderer from 'react-test-renderer'
import App from '../App'

describe('App', () => {
  it('should test something', () => {
    expect(false).toBeFalsy()
  })

  it('should match snapshot rendered', () => {
    const component = renderer.create(<App />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})