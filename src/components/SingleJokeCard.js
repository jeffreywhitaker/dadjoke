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
      <p>>>> {joke.dadjokeanswer}</p>
    </SingleJokeCardDiv>
  );
}

// export component
export default SingleJokeCard;

// styled components
const SingleJokeCardDiv = styled.div`
  width: 80%
  margin: 20px auto
  background: cyan
  border-radius: 15px
  padding: 5px 15px
`;
