import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import renderer from 'react-test-renderer'

import AddJoke from '../components/modals/AddJokeModal'
// import 'jest-styled-components';

const props = {
  callAddJoke() {
    console.log('callAddJoke')
  },
  handleClose() {
    console.log('handleClose')
  },
  handleKeywordsChange() {
    console.log('handleKeywordsChange')
  },
  handleValueChange() {
    console.log('handleValueChange')
  },
  handleSetIsPrivate() {
    console.log('handleSetIsPrivate')
  },
  newJoke: {
    dadjokeanswer: '',
    dadjokequestion: '',
    isprivate: false,
    keywords: [],
  },
  showAddJokeModal: false,
}

describe('AddJoke component', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Router>
          <AddJoke {...props} />
        </Router>,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

// notes for tests
// expect add joke button to call function
// expect data to appear in appropriate places when entered
// expect the modal to load when the showAddJokeModal is true
// expect keywords to be saved and sent properly
