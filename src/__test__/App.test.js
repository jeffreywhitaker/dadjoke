// import React from 'react'
// import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
// import { App } from '../App'

// it('renders without crashing', () => {
//   const div = document.createElement('div')
//   ReactDOM.render(<Router><App props={() => {}} /></Router>, div)
//   ReactDOM.unmountComponentAtNode(div)
// })

import React from 'react'
import { App } from '../App'
import ShallowRenderer from 'react-test-renderer/shallow'
// import 'jest-styled-components';

describe('App component', () => {
  it('renders correctly', () => {
    // jest.mock('react-router-dom', () => ({
    //   useHistory: () => ({
    //     push: jest.fn(),
    //   }),
    // }))

    const renderer = new ShallowRenderer()
    renderer.render(<App props={() => {}} />)

    expect(renderer.getRenderOutput()).toMatchSnapshot()
  })
})
