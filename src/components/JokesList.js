// import dependencies
import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

// import actions
import { getPublicJokes } from "../actions/actions";
import SingleJokeCard from "./SingleJokeCard";

// login page component
function JokesList({ getPublicJokes, jokes }) {
  console.log("jokes", jokes);
  // get jokes on page load
  useEffect(() => {
    getPublicJokes();
  }, [getPublicJokes]);

  // render the following
  return (
    <JokesListDiv>
      {jokes ? (
        jokes.map(joke => {
          return <SingleJokeCard joke={joke} key={joke.dadjokeid} />;
        })
      ) : (
        <p>No jokes are in database - add them now!</p>
      )}
    </JokesListDiv>
  );
}

// connect component to redux store
const mapStateToProps = state => {
  return {
    jokes: state.jokes.jokes
  };
};

// export component
export default connect(mapStateToProps, { getPublicJokes })(JokesList);

// styled components
const JokesListDiv = styled.div`
  width: 200px
  margin: 20px auto
`;
