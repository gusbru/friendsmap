import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "@material-ui/core/Slider";
import { mapActions, groupsActions } from "../actions/";

const menuStyle = {
  width: "100%"
};
export class NewFriend extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      selectedGroup: ""
    };

    this.valuetext = this.valuetext.bind(this);
    this.insertNewFriend = this.props.insertNewFriend.bind(this);
    this.cancelAddNewFriend = this.props.cancelAddNewFriend.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeSlider = this.handleChangeSlider.bind(this);
    this.setNewFriendRadius = this.props.setNewFriendRadius.bind(this);
  }

  valuetext(value) {
    return `${value} m`;
  }

  handleSubmit(event) {
    event.preventDefault();
    const { name, selectedGroup } = this.state;
    const { lat, lng, radius } = this.props;
    const newFriend = {
      name,
      lat,
      lng,
      radius
    };

    // if a group was chosen, add the friend to the group
    if (selectedGroup) {
      newFriend.groupId = selectedGroup;
    }

    // add the friend
    this.insertNewFriend(newFriend);

    // clean and close
    this.cancelAddNewFriend();
  }

  handleReset() {
    event.preventDefault();
    console.log("reset");
    this.setState({
      name: ""
    });
    this.setNewFriendRadius(1000);
    this.cancelAddNewFriend();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleChangeSlider(event, newValue) {
    this.setNewFriendRadius(newValue);
  }

  render() {
    const { name, selectedGroup } = this.state;
    const { lat, lng, groupList, radius } = this.props;
    return (
      <div>
        <h2>New Friend</h2>
        <form onSubmit={this.handleSubmit} onReset={this.handleReset}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              className="form-control"
              aria-describedby="emailHelp"
              placeholder="Friend Name"
              type="text"
              id="name"
              name="name"
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="radius">Radius: {radius.toFixed(0)}</label>
            <Slider
              id="radius"
              name="radius"
              aria-labelledby="friend radius size"
              step={100}
              marks
              min={1000}
              max={15000}
              value={radius}
              onChange={this.handleChangeSlider}
            />
          </div>
          <div className="form-group">
            <label htmlFor="group-selector">Group:</label>
            <select
              className="form-control"
              name="group-selector"
              id="group-selector"
              style={menuStyle}
              value={selectedGroup}
              name="selectedGroup"
              onChange={this.handleChange}
            >
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
          <div className="w-100 form-group">
            <button
              className="btn btn-primary w-50"
              type="submit"
              disabled={lat && lng && name ? false : true}
            >
              Add
            </button>
            <button type="reset" className="btn btn-danger w-50">
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  lat: state.map.coords.lat,
  lng: state.map.coords.lng,
  groupList: state.groups.groupList,
  radius: state.groups.radius
});

const mapDispatchToProps = dispatch => ({
  insertNewFriend: newFriend =>
    dispatch(groupsActions.insertNewFriend(newFriend)),
  cancelAddNewFriend: () => dispatch(mapActions.cancelAddNewFriend()),
  setNewFriendRadius: radius =>
    dispatch(groupsActions.setNewFriendRadius(radius))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewFriend);
