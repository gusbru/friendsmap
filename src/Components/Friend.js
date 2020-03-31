import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "@material-ui/core/Slider";
import { groupsActions } from "../actions/";

export class Friend extends Component {
  constructor(props) {
    super(props);

    this.state = {
      _id: "",
      name: "",
      radius: 1000,
      isEditing: false,
      prevName: "",
      prevRadius: ""
    };

    this.startEdit = this.startEdit.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeSlider = this.handleChangeSlider.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.removeFriendById = this.props.removeFriendById.bind(this);
  }

  componentDidMount() {
    const { _id, name, radius } = this.props.item;
    this.setState({
      _id,
      name,
      radius
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.item._id !== this.props.item._id) {
      console.log("component updated!");
      const { _id, name, radius } = this.props.item;
      this.setState({
        _id,
        name,
        radius
      });
    }
  }

  startEdit() {
    // save the previous state before editing
    this.setState({
      prevName: this.state.name,
      prevRadius: this.state.radius
    });

    this.setState({
      isEditing: true
    });
  }

  cancelEdit() {
    // get previous state
    const { prevName, prevRadius } = this.state;

    // update the state
    this.setState({
      name: prevName,
      radius: prevRadius,
      prevName: "",
      prevRadius: "",
      isEditing: false
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleChangeSlider(event, newValue) {
    this.setState({
      radius: newValue
    });
  }

  handleDelete() {
    const { _id } = this.state;
    console.log("delete");
    console.log(_id);
    this.removeFriendById(_id);
  }

  render() {
    const { name, radius, isEditing } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-8 m-0 p-0">
            <div>
              <label htmlFor="name" className="m-0">
                Name
              </label>
              <input
                name="name"
                id="name"
                className="w-100 form-control"
                type="text"
                value={name}
                disabled={!isEditing}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label htmlFor="radius" className="m-0">
                Radius [m]
              </label>
              {!isEditing ? (
                <input
                  name="radius"
                  id="radius"
                  className="w-100 form-control"
                  type="number"
                  value={radius.toFixed(0)}
                  disabled
                />
              ) : (
                <Slider
                  id="radius"
                  name="radius"
                  aria-labelledby="friend radius size"
                  className="ml-2"
                  style={{ width: "95%" }}
                  valueLabelDisplay="auto"
                  step={100}
                  marks
                  min={1000}
                  max={15000}
                  value={radius}
                  onChange={this.handleChangeSlider}
                />
              )}
            </div>
          </div>
          <div className="col-4 m-0 p-0">
            <div className="container h-100">
              <div className="row m-1 h-50">
                {isEditing ? (
                  <button
                    type="button"
                    className="btn btn-warning w-100"
                    onClick={this.cancelEdit}
                  >
                    Cancel
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-primary w-100"
                    onClick={this.startEdit}
                  >
                    Edit
                  </button>
                )}
              </div>
              <div className="row m-1 h-50">
                {isEditing ? (
                  <button type="button" className="btn btn-success w-100">
                    Save
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-danger w-100"
                    onClick={this.handleDelete}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  removeFriendById: friendId =>
    dispatch(groupsActions.removeFriendById(friendId))
});

export default connect(null, mapDispatchToProps)(Friend);
