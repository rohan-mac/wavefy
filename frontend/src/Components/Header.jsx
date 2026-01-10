import React from "react";
import User from "./Header.User";
import "../Header.css";
import Nevigation from "./Nevigation";

const Header = ({ user }) => {
  console.log(user);
  
  return (
    <>
      <header className="header">
        <Nevigation />
        <User user={user} />
      </header>
    </>

  );
};

export default Header;
