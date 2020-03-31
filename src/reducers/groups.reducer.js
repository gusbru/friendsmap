import { groupsConstants } from "../constants/groups.constants";
import { friendsConstants } from "../constants/friends.constants";

const initialState = {
  groupList: [],
  friendsList: [],
  radius: 1000,
  isAddingNewGroup: false
};

export const groups = (state = initialState, action) => {
  switch (action.type) {
    case groupsConstants.ALL_GROUPS_FETCHED:
      return {
        ...state,
        groupList: [...action.groupList]
      };
    case groupsConstants.FRIENDS_BY_GROUP_ID:
      return {
        ...state,
        friendsList: [...action.friendsByGroup]
      };
    case friendsConstants.ALL_FRIENDS_FETCHED:
      return {
        ...state,
        friendsList: [...action.friendsList]
      };
    case friendsConstants.NEW_FRIEND_ADDED_SUCCESSFULLY:
      const { friendsList } = state;
      const { newFriend } = action;
      return {
        ...state,
        friendsList: [...friendsList, newFriend]
      };
    case groupsConstants.FRIEND_ADDED_TO_GROUP:
      return {
        ...state
      };
    case friendsConstants.FRIEND_REMOVE_SUCCESSFULLY:
      const { friendId } = action;
      const newFriendList = state.friendsList.filter(
        friend => friend._id !== friendId
      );

      return {
        ...state,
        friendsList: [...newFriendList]
      };
    case friendsConstants.NEWFRIENDRADIUS:
      {
        return {
          ...state,
          radius: action.radius
        };
      }
    case groupsConstants.ADD_NEW_GROUP:
      {
        return {
          ...state,
          isAddingNewGroup: true
        };
      }
    case groupsConstants.CANCEL_ADD_NEW_GROUP:
      {
        return {
          ...state,
          isAddingNewGroup: false
        };
      }
    case groupsConstants.NEW_GROUP_ADDED:
      {
        return {
          ...state,
          groupList: [...state.groupList, action.newGroup],
          isAddingNewGroup: false
        };
      }
    default:
      return state;
  }
};
