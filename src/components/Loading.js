// import dependencies
import React from 'react'
import styled from 'styled-components'

// Loading component
function Loading() {
  return (
    <LoadingContainer>
      <p>Content is currently loading...</p>
      <div className="lds-spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </LoadingContainer>
  )
}

// styled components
const LoadingContainer = styled.div`
  text-align: center;
`

// export component
export default Loading
