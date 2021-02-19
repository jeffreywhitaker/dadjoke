import React, { ReactElement } from 'react'

import Button from 'react-bootstrap/Button'

import Pagination from '../small/Pagination'

import styled from 'styled-components'

interface Props {
  advancedFilter: boolean
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
  setAdvancedFilter: (val: boolean) => void
  setAdvancedFilterCriteria: () => void
  setSearchString: (val: string) => void
  setSubmittedBy: (val: string) => void
  submittedBy: string
}

export default function FilterJokesDashboard(props: Props): ReactElement {
  const {
    advancedFilter,
    criteria,
    handlePageDown,
    handlePageUp,
    handleResultsPerPageChange,
    handleSortByChange,
    hasNextPage,
    searchString,
    setAdvancedFilter,
    setAdvancedFilterCriteria,
    setSearchString,
    setSubmittedBy,
    submittedBy,
  } = props

  return (
    <Wrapper>
      <div className="sortOptions">
        <Button size="sm" onClick={() => setAdvancedFilter(!advancedFilter)}>
          {'>>'}
        </Button>
        <div>
          <span>Sort by: </span>
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
        </div>
        <div>
          <span>Results: </span>
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
        </div>
        {advancedFilter && (
          <>
            <hr />
            <h4>Advanced Filters</h4>
            <div>
              <span>Keyword: </span>
              <input
                name="search"
                value={searchString}
                onChange={(e) => setSearchString(e.currentTarget.value)}
              />
              &nbsp;&nbsp;
            </div>
            <div>
              <span>Submitted by: </span>
              <input
                name="submittedBy"
                value={submittedBy}
                onChange={(e) => setSubmittedBy(e.currentTarget.value)}
              />
            </div>
            <button onClick={setAdvancedFilterCriteria}>Search</button>
          </>
        )}
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
    align-items: center;
    /* display: flex;
    flex-direction: column; */

    div {
      margin: 0 5px;
    }
  }

  @media only screen and (min-width: 610px) {
    .sortOptions {
      display: flex;
    }
  }
`
