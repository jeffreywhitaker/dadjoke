// import dependencies
import React from 'react'

// Loading component
function Loading() {
  return (
    <>
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
    </>
  )
}

// export component
export default Loading
