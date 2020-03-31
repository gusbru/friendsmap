import React, { Component } from "react";
import { connect } from "react-redux";
import { groupsActions } from "../actions";

const menuStyle = {
  width: "100%"
};

export class GroupsMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedGroup: "",
      groupList: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.fetchFriendsByGroupId = this.props.fetchFriendsByGroupId.bind(this);
    this.fetchAllFriends = this.props.fetchAllFriends.bind(this);
    this.fetchAllGroups = this.props.fetchAllGroups.bind(this);
    this.startAddNewGroupMode = this.props.startAddNewGroupMode.bind(this);
  }

  async componentDidMount() {
    try {
      this.fetchAllGroups();
    }
    catch (error) {
      console.log(error);
    }
  }

  handleChange(event) {
    try {
      // https://reactjs.org/docs/events.html
      // event.persist();
      const groupId = event.target.value;

      if (groupId === "addGroup") {
        console.log("add new group");
        this.startAddNewGroupMode();
      }
      else if (groupId) {
        console.log("especific group", groupId);
        this.fetchFriendsByGroupId(groupId);
      }
      else {
        console.log("all friends");
        this.fetchAllFriends();
      }
      // const friendList = await getAllFriends();
      // this.setFriendList(friendList);
      this.setState({
        [event.target.name]: groupId
      });
    }
    catch (error) {
      console.log(error);
    }
  }

  render() {
    const { selectedGroup } = this.state;
    const { groupList } = this.props;
    return (
      <div>
        <select
          className="form-control"
          style={menuStyle}
          value={selectedGroup}
          name="selectedGroup"
          onChange={this.handleChange}
        >
          <option value="addGroup">add group...</option>
          <option value="" defaultChecked>
            All Friends
          </option>
          {groupList ? (
            groupList.map(group => (
              <option key={group._id} value={group._id}>
                {group.name}
              </option>
            ))
          ) : (
            <option>No Groups</option>
          )}
        </select>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  groupList: state.groups.groupList,
  friendsCurrentGroup: state.groups.friendsCurrentGroup
});

const mapDispatchToProps = dispatch => ({
  fetchAllGroups: () => dispatch(groupsActions.fetchAllGroups()),
  fetchFriendsByGroupId: groupId =>
    dispatch(groupsActions.fetchFriendsByGroupId(groupId)),
  fetchAllFriends: () => dispatch(groupsActions.fetchAllFriends()),
  startAddNewGroupMode: () => dispatch(groupsActions.startAddNewGroupMode())
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupsMenu);
