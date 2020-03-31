import React, { Component } from "react";
import { connect } from "react-redux";
import { groupsActions } from "../actions/";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";

export class NewFriend extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groupName: ""
    };

    this.handleCancel = this.handleCancel.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.insertNewGroup = this.props.insertNewGroup.bind(this);
    this.cancelAddNewGroupMode = this.props.cancelAddNewGroupMode.bind(this);
  }

  handleSave() {
    console.log("saving");
    const { groupName } = this.state;
    this.insertNewGroup(groupName);
  }

  handleCancel() {
    this.cancelAddNewGroupMode();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    const { groupName } = this.state;
    return (
      <div className="input-group mb-3">
        <input
          className="form-control"
          aria-describedby="new group name"
          aria-label="new group name"
          placeholder="New Group Name"
          type="text"
          id="groupName"
          name="groupName"
          value={groupName}
          onChange={this.handleChange}
        />
        <div className="input-group-append">
          <button
            className="input-group-text"
            id="saveNewGroup"
            disabled={groupName ? false : true}
            onClick={this.handleSave}
          >
            <CheckIcon />
          </button>
          <button
            className="input-group-text"
            id="cancelNewGroup"
            onClick={this.handleCancel}
          >
            <ClearIcon />
          </button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  insertNewGroup: groupName =>
    dispatch(groupsActions.insertNewGroup(groupName)),
  cancelAddNewGroupMode: () => dispatch(groupsActions.cancelAddNewGroupMode())
});

export default connect(null, mapDispatchToProps)(NewFriend);
