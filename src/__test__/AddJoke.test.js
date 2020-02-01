import React from 'react'
import { AddJoke } from '../components/AddJoke'
import renderer from 'react-test-renderer'
// import 'jest-styled-components';

describe('AddJoke component', () => {
  it('renders correctly', () => {
    jest.mock('react-router-dom', () => ({
      useHistory: () => ({
        push: jest.fn(),
      }),
    }))

    const tree = renderer.create(<AddJoke addJoke={() => {}} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
