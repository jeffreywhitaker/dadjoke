import React, { ReactElement } from 'react'

import Pagination from '../small/Pagination'

import styled from 'styled-components'

interface Props {
  criteria: {
    sortBy: string
    resultsPerPage: string
    searchString: string
    page: number
    isprivate: boolean
  }
  handlePageDown: () => void
  handlePageUp: () => void
  handleResultsPerPageChange: () => void
  handleSortByChange: () => void
  hasNextPage: boolean
  searchString: string
  setKeywordSearch: () => void
  setSearchString: (value: string) => void
}

export default function FilterJokesDashboard(props: Props): ReactElement {
  const {
    criteria,
    handlePageDown,
    handlePageUp,
    handleResultsPerPageChange,
    handleSortByChange,
    hasNextPage,
    searchString,
    setKeywordSearch,
    setSearchString,
  } = props

  return (
    <Wrapper>
      <div className="sortOptions">
        Sort by:{' '}
        <select
          name="sortBy"
          id="sortBy"
          value={criteria.sortBy}
          onChange={handleSortByChange}
        >
          <option value="-createdAt">Newest to Oldest</option>
          <option value="createdAt">Oldest to Newest</option>
          <option value="-karma">Karma, Highest to Lowest</option>
          <option value="karma">Karma, Lowest to Highest</option>
        </select>
        &nbsp;&nbsp; Results:{' '}
        <select
          name="resultsPerPage"
          id="resultsPerPage"
          value={criteria.resultsPerPage}
          onChange={handleResultsPerPageChange}
        >
          <option value="2">2</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
        &nbsp;&nbsp; Keyword:{' '}
        <input
          name="search"
          value={searchString}
          onChange={(e) => setSearchString(e.currentTarget.value)}
        />
        &nbsp;&nbsp;
        <button onClick={setKeywordSearch}>Set Keyword</button>
      </div>

      <Pagination
        page={criteria.page}
        hasNextPage={hasNextPage}
        handlePageDown={handlePageDown}
        handlePageUp={handlePageUp}
      />
    </Wrapper>
  )
}

const Wrapper = styled.section`
  background: lightblue;
  margin: 0 auto;
  border-radius: 6px;
  display: flex;
  padding: 10px;
  margin-top: 10px;
  justify-content: space-between;
  width: 100%;

  .sortOptions {
    padding-left: 20px;
  }
`
