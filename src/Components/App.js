import React, { Component } from "react";
import LateralMenu from "./LateralMenu";
import MapsDummy from "./MapsDummy";

const style = {
  main: {
    display: "grid",
    gridTemplateColumns: "2fr 5fr",
    width: "auto",
    height: "100vh"
  }
};
export default class App extends Component {
  render() {
    return (
      <div style={style.main}>
        <LateralMenu />
        <MapsDummy />
      </div>
    );
  }
}
