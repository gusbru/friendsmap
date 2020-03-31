import { mapConstants } from "../constants/map.constants";

const initialState = {
  coords: {
    lat: "",
    lng: ""
  },
  isAddingFriend: false,
  isListenerAttatched: false,
  markerList: []
};

export const map = (state = initialState, action) => {
  switch (action.type) {
    case mapConstants.ADDNEWFRIEND: {
      return {
        ...state,
        coords: action.coords,
        isAddingFriend: true,
        isListenerAttatched: true
      };
    }
    case mapConstants.CANCELADDNEWFRIEND: {
      return {
        ...state,
        coords: {
          lat: "",
          lng: ""
        },
        isAddingFriend: false,
        isListenerAttatched: false
      };
    }
    case mapConstants.ADDMARKERSTOMAP: {
      return {
        ...state,
        markerList: [...action.markerList]
      };
    }
    case mapConstants.REMOVEALLMARKERSFROMMAP: {
      if (state.markerList) {
        state.markerList.forEach(mark => {
          mark.setMap(null);
        });
      }
      return {
        ...state,
        markerList: []
      };
    }
    case mapConstants.ADDONEMARKERTOMAP: {
      return {
        ...state,
        markerList: [...state.markerList, action.marker]
      };
    }
    default:
      return state;
  }
};
