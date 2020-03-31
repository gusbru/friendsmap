import { mapConstants } from "../constants/map.constants";

const addNewFriend = (lat, lng) => ({
  type: mapConstants.ADDNEWFRIEND,
  coords: {
    lat,
    lng
  }
});

const cancelAddNewFriend = () => ({
  type: mapConstants.CANCELADDNEWFRIEND
});

const addMarkersToMap = (markerList, googleMap) => {
  // add markers to map
  markerList.map(marker => marker.setMap(googleMap));
  return {
    type: mapConstants.ADDMARKERSTOMAP,
    markerList
  };
};

const removeAllMarkersFromMap = () => ({
  type: mapConstants.REMOVEALLMARKERSFROMMAP
});

const addOneMarketToMap = (marker, googleMap) => {
  marker.setMap(googleMap);
  return {
    type: mapConstants.ADDONEMARKERTOMAP,
    marker
  };
};

export const mapActions = {
  addNewFriend,
  cancelAddNewFriend,
  addMarkersToMap,
  removeAllMarkersFromMap,
  addOneMarketToMap
};
