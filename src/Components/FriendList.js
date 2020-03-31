import React, { Component } from "react";
import { connect } from "react-redux";
import GroupsMenu from "./GroupsMenu";
import Friend from "./Friend";
import NewGroup from "./NewGroup";
import { mapActions, groupsActions } from "../actions/";

const componentStyle = {
  addFriends: {
    display: "grid",
    gridTemplateColumns: "4fr 1fr"
  },
  column: {
    height: "100%"
  },
  table: {
    position: "relative",
    height: "85vh",
    overflow: "auto"
  }
};

export class FriendList extends Component {
  constructor(props) {
    super(props);

    this.fetchAllFriends = this.props.fetchAllFriends.bind(this);
    this.addNewFriend = this.props.addNewFriend.bind(this);
  }

  componentDidMount() {
    this.fetchAllFriends();
  }

  render() {
    const { friendsList } = this.props;
    const numberOfFriends = friendsList.length;

    // TODO: add another component here to add a new groups and choose between addNewGroup or GroupsMenu

    return (
      <div style={componentStyle.column}>
        <div style={componentStyle.addFriends}>
          <h2>
            Friends{" "}
            <span className="badge badge-primary">{numberOfFriends}</span>
          </h2>
          <button
            type="button"
            className="btn btn-outline-primary m-2"
            onClick={this.addNewFriend}
          >
            +
          </button>
        </div>

        {this.props.isAddingNewGroup ? (<NewGroup />) : (<GroupsMenu setFriendList={this.setFriendList} />) }
        
        
        {numberOfFriends === 0 ? (
          <div>You have no friends :(</div>
        ) : (
          <div style={componentStyle.table}>
            <table className="table table-bordered">
              <tbody>
                {friendsList.map((friend, index) => (
                  <tr key={index}>
                    <td>
                      <Friend item={friend} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  friendsList: state.groups.friendsList,
  isAddingNewGroup: state.groups.isAddingNewGroup
});

const mapDispatchToProps = dispatch => ({
  addNewFriend: () => dispatch(mapActions.addNewFriend()),
  fetchAllFriends: () => dispatch(groupsActions.fetchAllFriends())
});

export default connect(mapStateToProps, mapDispatchToProps)(FriendList);
