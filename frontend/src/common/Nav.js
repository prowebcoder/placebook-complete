import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./nav.css";
import Avatar from "./Avatar";
import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import SideDrawer from "./UIComponents/SideDrawer";
import Backdrop from "./UIComponents/Backdrop";
function Nav() {
  const [sideDrawer, setsideDrawer] = useState(false);

  function showSideDrawer() {
    setsideDrawer(true);
  }
  function hideSideDrawer() {
    setsideDrawer(false);
  }

  const image =
    "https://prowebcoder.com/cdn/shop/files/logo.png?v=1619583060&width=500";
  return (
    <React.Fragment>
      {sideDrawer && (
        <>
          <Backdrop onClick={hideSideDrawer}></Backdrop>
          <SideDrawer>
            <nav className="main-navigation__drawer-nav">
              <NavLinks></NavLinks>
            </nav>
          </SideDrawer>
        </>
      )}
      <MainHeader>
        <button className="main-navigation__menu-btn" onClick={showSideDrawer}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <h1 className="logo main-navigation__title">
          <Link to="/">
            <Avatar image={image} className="logo"></Avatar>
          </Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks></NavLinks>
        </nav>
      </MainHeader>
    </React.Fragment>
  );
}

export default Nav;
