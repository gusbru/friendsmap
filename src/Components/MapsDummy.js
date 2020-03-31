import React, { Component } from "react";
import { connect } from "react-redux";
import { mapActions, groupsActions } from "../actions/";

// development
// const GOOGLE_MAP_API_KEY = process.env.API_KEY;

// production
const GOOGLE_MAP_API_KEY = "";

const componentStyle = {
  map: {
    width: "auto",
    height: "100%"
  }
};

export class MapsDummy extends Component {
  constructor(props) {
    super(props);

    this.state = {
      googleMap: "",
      newFriendLat: 0,
      newFriendLng: 0,
      newFriendMarker: "",
      newFriendCircle: ""
    };

    this.addNewFriend = this.props.addNewFriend.bind(this);
    this.addFriend = this.addFriend.bind(this);
    this.setupScript = this.setupScript.bind(this);
    this.createGoogleMap = this.createGoogleMap.bind(this);
    this.addMarkerList = this.addMarkerList.bind(this);
    this.addMarkersToMap = this.props.addMarkersToMap.bind(this);
    this.removeAllMarkersFromMap = this.props.removeAllMarkersFromMap.bind(
      this
    );
    this.calculateCenter = this.calculateCenter.bind(this);
    this.handleCircleRadiusChange = this.handleCircleRadiusChange.bind(this);
    this.setNewFriendRadius = this.props.setNewFriendRadius.bind(this);
  }

  addFriend(event) {
    const { newFriendMarker, googleMap, newFriendCircle } = this.state;
    const { radius } = this.props;
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();

    // remove previous marker and circle
    if (newFriendMarker) newFriendMarker.setMap(null);
    if (newFriendCircle) {
      newFriendCircle.setMap(null);
      window.google.maps.event.clearListeners(
        newFriendCircle,
        "radius_changed"
      );
    }

    // create a marker
    const newMarker = new window.google.maps.Marker({
      position: {
        lat,
        lng
      }
    });

    // create a new circle
    const newCircle = new window.google.maps.Circle({
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
      center: new window.google.maps.LatLng(lat, lng),
      radius: radius,
      editable: true,
      draggable: false
    });

    // add marker and circle to map
    newMarker.setMap(googleMap);
    newCircle.setMap(googleMap);

    // addListener to circle
    window.google.maps.event.addListener(newCircle, "radius_changed", () => {
      this.setNewFriendRadius(newCircle.getRadius());
    });

    // add to state
    this.setState({
      newFriendMarker: newMarker,
      newFriendCircle: newCircle,
      newFriendLat: lat,
      newFriendLng: lng
    });

    this.addNewFriend(lat, lng);
  }

  componentDidMount() {
    console.log("didMount Maps called");
    this.setupScript();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isAddingFriend != this.props.isAddingFriend) {
      const { isAddingFriend } = this.props;
      const { googleMap } = this.state;
      if (isAddingFriend) {
        googleMap.addListener("click", this.addFriend);
      } else {
        window.google.maps.event.clearListeners(googleMap, "click");
      }

      // clean state
      if (!this.props.isAddingFriend) {
        const { newFriendMarker, newFriendCircle } = this.state;
        if (newFriendMarker) newFriendMarker.setMap(null);
        if (newFriendCircle) newFriendCircle.setMap(null);

        this.setState({
          newFriendLat: 0,
          newFriendLng: 0,
          newFriendMarker: "",
          newFriendCircle: ""
        });
      }
    }

    if (prevProps.friendsList !== this.props.friendsList) {
      this.removeAllMarkersFromMap();
      this.addMarkerList();
      this.calculateCenter();
    }

    if (prevProps.radius !== this.props.radius && this.props.isAddingFriend) {
      const {
        googleMap,
        newFriendCircle,
        newFriendLat,
        newFriendLng
      } = this.state;

      const { radius } = this.props;

      if (newFriendCircle) {
        newFriendCircle.setMap(null);
        window.google.maps.event.clearListeners(
          newFriendCircle,
          "radius_changed"
        );
      }

      // create a new circle
      const newCircle = new window.google.maps.Circle({
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        center: new window.google.maps.LatLng(newFriendLat, newFriendLng),
        radius: radius,
        editable: true,
        draggable: false
      });

      // add circle to map
      newCircle.setMap(googleMap);

      // addListener
      window.google.maps.event.addListener(newCircle, "radius_changed", () => {
        this.setNewFriendRadius(newCircle.getRadius());
      });

      // update to state
      this.setState({
        newFriendCircle: newCircle
      });
    }
  }

  handleCircleRadiusChange(circle) {
    console.log("radius changed!");
    // const newRadius = circle.getRadius();
    // console.log("Radius changed!!!!", newRadius);
    // this.setNewFriendRadius(newRadius);
  }

  setupScript() {
    const googleMapScript = document.createElement("script");
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}&libraries=places`;
    googleMapScript.setAttribute("async", "");
    googleMapScript.setAttribute("defer", "");
    window.document.body.appendChild(googleMapScript);
    googleMapScript.addEventListener("load", () => {
      const googleMap = this.createGoogleMap();
      this.setState({
        googleMap
      });
    });
  }

  createGoogleMap() {
    const googleMap = new window.google.maps.Map(
      document.getElementById("google-map"),
      {
        zoom: 12,
        center: { lat: 0, lng: 0 },
        disableDefaultUI: true
      }
    );
    return googleMap;
  }

  addMarkerList() {
    const markers = [];
    const { friendsList } = this.props;
    const { googleMap } = this.state;
    for (let i = 0; i < friendsList.length; i++) {
      const marker = new window.google.maps.Marker({
        position: {
          lat: friendsList[i].lat,
          lng: friendsList[i].lng
        },
        title: friendsList[i].name
      });
      markers.push(marker);
    }
    this.addMarkersToMap(markers, googleMap);
  }

  calculateCenter() {
    const { googleMap } = this.state;
    const { friendsList } = this.props;

    if (friendsList.length !== 0) {
      let newLat = 0;
      let newLng = 0;
      friendsList.forEach(friend => {
        newLat += friend.lat;
        newLng += friend.lng;
      });

      newLat /= friendsList.length;
      newLng /= friendsList.length;
      googleMap.panTo(new window.google.maps.LatLng(newLat, newLng));
    }

    // const bounds = googleMap.getBounds();
    // console.log("getBounds", bounds.toJSON());
  }

  render() {
    return <div id="google-map" style={componentStyle.map} />;
  }
}

const mapStateToProps = state => ({
  isAddingFriend: state.map.isAddingFriend,
  friendsList: state.groups.friendsList,
  markerList: state.map.markerList,
  radius: state.groups.radius
});

const mapDispatchToProps = dispatch => ({
  addNewFriend: (lat, lng) => dispatch(mapActions.addNewFriend(lat, lng)),
  addMarkersToMap: (markerList, googleMap) =>
    dispatch(mapActions.addMarkersToMap(markerList, googleMap)),
  removeAllMarkersFromMap: () => dispatch(mapActions.removeAllMarkersFromMap()),
  setNewFriendRadius: radius =>
    dispatch(groupsActions.setNewFriendRadius(radius))
});

export default connect(mapStateToProps, mapDispatchToProps)(MapsDummy);
