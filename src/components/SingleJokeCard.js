// import dependencies
import React from "react";
import styled from "styled-components";

// login page component
function SingleJokeCard(props) {
  // destructure props
  let { joke } = props;

  // render the following
  return (
    <SingleJokeCardDiv>
      <p>{joke.dadjokequestion}</p>
      <p>{joke.dadjokeanswer}</p>
    </SingleJokeCardDiv>
  );
}

// export component
export default SingleJokeCard;

// styled components
const SingleJokeCardDiv = styled.div`
  width: 200px
  margin: 20px auto
`;
