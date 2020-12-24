import React from 'react'

import Button from 'react-bootstrap/Button'

import styled from 'styled-components'

export default function Pagination(props) {
  const { criteria, hasNextPage, handlePageDown, handlePageUp } = props

  return (
    <PaginationDiv>
      <Button
        size="sm"
        onClick={handlePageDown}
        variant={criteria.page <= 1 ? 'secondary' : 'primary'}
        disabled={criteria.page <= 1}
      >
        {'<<'}
      </Button>
      <span className="page">Page: {criteria.page}</span>
      <Button
        size="sm"
        variant={!hasNextPage ? 'secondary' : 'primary'}
        disabled={!hasNextPage}
        onClick={handlePageUp}
      >
        {'>>'}
      </Button>
    </PaginationDiv>
  )
}

// styled component
const PaginationDiv = styled.div`
  display: flex;
  padding-right: 20px;
  align-items: center;

  > .page {
    margin: 0 5px;
  }
`
