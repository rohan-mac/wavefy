import React from "react";
import User from "./Header.User";
import "../Header.css";
import Nevigation from "./Nevigation";

const Header = () => {
  return (
    <header className="header">
      <Nevigation/>
      <User />  
    </header>
  );
};

export default Header;
