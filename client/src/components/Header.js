import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <div className="header">
        <Link to="/">Shopping Cart</Link>
        <Link to="/create-item" className="add-item">Add new item</Link>
      </div>
    );
  }
}

export default Header;
