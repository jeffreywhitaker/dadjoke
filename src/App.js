// import dependencies
import React from "react";
import { Route } from "react-router-dom";
import styled from "styled-components";

// import components
import NavBar from "./components/NavBar";
import JokesList from "./components/JokesList";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Signup from "./components/Signup";

// App component
export default function App() {
  return (
    <AppWrapper className="App">
      <Route path="/" component={NavBar} />
      <Route path="/jokes" component={JokesList} />
      <Route path="/profile" component={Profile} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <p>App test.</p>
    </AppWrapper>
  );
}

// styled components
const AppWrapper = styled.div`
  max-width: 1100px
  margin: 0 auto
`;
