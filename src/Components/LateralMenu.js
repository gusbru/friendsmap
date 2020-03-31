import React, { Component } from "react";
import { connect } from "react-redux";
import FriendList from "./FriendList";
import NewFriend from "./NewFriend";

const componentStyle = {
  menu: {
    width: "auto",
    height: "100%",
    border: "1px solid black",
    padding: "20px"
  }
};

export class LateralMenu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { isAddingFriend } = this.props;

    return (
      <div style={componentStyle.menu}>
        {isAddingFriend ? <NewFriend /> : <FriendList />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAddingFriend: state.map.isAddingFriend
});

export default connect(mapStateToProps, null)(LateralMenu);
