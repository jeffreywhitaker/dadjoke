// import dependencies
import React from "react";
import { Route } from "react-router-dom";
import styled from "styled-components";

// import components
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import JokesList from "./components/JokesList";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Signup from "./components/Signup";
import BottomNav from "./components/BottomNav";

// App component
export default function App() {
  return (
    <AppWrapper className="App">
      <Route component={NavBar} />
      <ContentContainer>
        <Route exact path="/" component={Home} />
        <Route path="/jokes" component={JokesList} />
        <Route path="/profile" component={Profile} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
      </ContentContainer>
      <Route component={BottomNav} />
    </AppWrapper>
  );
}

// styled components
const AppWrapper = styled.div`
  max-width: 1100px
  width: 100%
  height: 100vh
  margin: 0 auto
  background: lightblue
  display: flex
  flex-direction: column
`;

const ContentContainer = styled.article`
  flex-grow: 1;
`;
