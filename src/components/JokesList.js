// import dependencies
import React, { useEffect } from "react";
import { connect } from "react-redux";

// import actions
import { getPublicJokes } from "../actions/actions";
import SingleJokeCard from "./SingleJokeCard";

// login page component
function JokesList({ getPublicJokes, jokes, isLoading }) {
  console.log("jokes", jokes);
  // get jokes on page load
  useEffect(() => {
    getPublicJokes();
  }, [getPublicJokes]);

  // render the following
  return (
    <div>
      {isLoading ? (
        <p>Content is currently loading...</p>
      ) : jokes ? (
        jokes.map(joke => {
          return <SingleJokeCard joke={joke} key={joke.dadjokeid} />;
        })
      ) : (
        <p>No jokes are in database - add them now!</p>
      )}
    </div>
  );
}

// connect component to redux store
const mapStateToProps = state => {
  return {
    jokes: state.jokes.jokes,
    isLoading: state.jokes.isLoading
  };
};

// export component
export default connect(mapStateToProps, { getPublicJokes })(JokesList);
