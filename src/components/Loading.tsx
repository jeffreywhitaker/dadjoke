// import dependencies
import React from 'react'
import styled from 'styled-components'

// Loading component
const Loading: React.FC = () => {
  return (
    <LoadingContainer>
      <p>Content is currently loading...</p>
      <p>
        Heroku takes about 20 seconds to start up if it hasn't been recently
        used. Please be patient!
      </p>
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
