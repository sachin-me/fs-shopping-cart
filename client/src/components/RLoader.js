import React, { Component } from "react";
import Loader from "react-loader-spinner";

class RLoader extends Component {
  render() {
    return (
      <div className="loader">
        <Loader type="Bars" color="FFC069" height={50} width={80} />
      </div>
    );
  }
}

export default RLoader;
