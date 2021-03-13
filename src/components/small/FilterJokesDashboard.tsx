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
  handleResultsPerPageChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSortByChange: (e: React.ChangeEvent<HTMLInputElement>) => void
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
      <div className="topRow">
        <div className="sortOptions">
          <Button size="sm" onClick={() => setAdvancedFilter(!advancedFilter)}>
            More
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
        </div>
        <Pagination
          page={criteria.page}
          hasNextPage={hasNextPage}
          handlePageDown={handlePageDown}
          handlePageUp={handlePageUp}
        />
      </div>

      {advancedFilter && (
        <div className="bottomRow">
          <hr />
          <h4>Advanced Filters</h4>
          <div className="advancedFilters">
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
          </div>
        </div>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.section`
  background: lightblue;
  margin: 0 auto;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin-top: 10px;
  width: 100%;

  .topRow {
    display: flex;
    justify-content: space-between;
    padding: 0 20px;

    .sortOptions {
      align-items: center;

      div {
        margin: 0 5px;
      }
    }
  }

  .bottomRow {
    padding: 0 20px;

    .advancedFilters {
      display: flex;

      button {
        margin: 0 5px;
      }
    }
  }

  @media only screen and (max-width: 520px) {
    .advancedFilters {
      flex-direction: column;

      button {
        max-width: 100px;
      }

      > * {
        margin: 2px 0;
      }
    }
  }

  @media only screen and (min-width: 610px) {
    .sortOptions {
      display: flex;
    }
  }
`
