// import dependencies
import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

// import functions

// NavBar component
function NavBar() {
  return (
    <NavBarSection>
      <NavLinkStyled exact to={"/"}>
        Home
      </NavLinkStyled>
      <NavLinkStyled to={"/jokes"}>Jokes</NavLinkStyled>
      <NavLinkStyled to={"/profile"}>Profile</NavLinkStyled>
      <NavLinkStyled to={"/login"}>Login</NavLinkStyled>
      <NavLinkStyled to={"/signup"}>Signup</NavLinkStyled>
    </NavBarSection>
  );
}

// connect Redux state
const mapStateToProps = state => {
  return {
    login: state.login
    //   user: state.user
  };
};

// export NavBar
export default connect(mapStateToProps, {})(NavBar);

// styled components
const NavBarSection = styled.section`
  display: flex
  justify-content: space-around
  padding: 5px 0
`;

const NavLinkStyled = styled(NavLink)`
  background: lightpink;
  text-decoration: none;
  color: black;
  padding: 5px 10px;
  &.active {
    filter: brightness(75%);
  }
`;
