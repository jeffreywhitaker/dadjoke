import React, { ReactElement } from 'react'

import Button from 'react-bootstrap/Button'

import styled from 'styled-components'

interface Props {
  hasNextPage: boolean
  handlePageDown: () => void
  handlePageUp: () => void
  page: number
}

export default function Pagination(props: Props): ReactElement {
  const { handlePageDown, handlePageUp, hasNextPage, page } = props
  return (
    <Wrapper>
      <span className="pageText">Page:</span>
      <div className="buttons">
        <Button
          size="sm"
          onClick={handlePageDown}
          variant={page <= 1 ? 'secondary' : 'primary'}
          disabled={page <= 1}
        >
          {'<<'}
        </Button>
        <span>&nbsp;{page}&nbsp;</span>
        <Button
          size="sm"
          variant={!hasNextPage ? 'secondary' : 'primary'}
          disabled={!hasNextPage}
          onClick={handlePageUp}
        >
          {'>>'}
        </Button>
      </div>
    </Wrapper>
  )
}

// styled component
const Wrapper = styled.article`
  display: flex;
  align-self: flex-start;
  align-items: center;

  .pageText {
    margin: 0 5px;
  }

  .buttons {
    display: flex;
    align-items: center;
  }

  @media only screen and (max-width: 550px) {
    flex-direction: column;
  }
`
