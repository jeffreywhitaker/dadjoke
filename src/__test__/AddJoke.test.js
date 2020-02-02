import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import renderer from 'react-test-renderer'

import { AddJoke } from '../components/AddJoke'
// import 'jest-styled-components';

describe('AddJoke component', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Router>
          <AddJoke addJoke={() => {}} />
        </Router>,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
