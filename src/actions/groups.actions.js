import { groupsConstants } from "../constants/groups.constants";
import { friendsConstants } from "../constants/friends.constants";
import {
  getAllGroups,
  getFriendsByGroupId,
  addFriendToGroup,
  addNewGroup
}
from "../Api/Groups";
import { getAllFriends, addNewFrined, removeFriend } from "../Api/Friends";

const fetchAllGroups = () => async dispatch => {
  try {
    const groupList = await getAllGroups();

    dispatch({
      type: groupsConstants.ALL_GROUPS_FETCHED,
      groupList
    });
  }
  catch (error) {
    console.log(error);
  }
};

const fetchFriendsByGroupId = groupId => async dispatch => {
  try {
    const friendsByGroup = await getFriendsByGroupId(groupId);

    dispatch({
      type: groupsConstants.FRIENDS_BY_GROUP_ID,
      friendsByGroup: friendsByGroup.friends
    });
  }
  catch (error) {
    console.log(error);
  }
};

const fetchAllFriends = () => async dispatch => {
  try {
    // request
    const friendsList = await getAllFriends();

    dispatch({
      type: friendsConstants.ALL_FRIENDS_FETCHED,
      friendsList
    });
  }
  catch (error) {
    console.log("Friends Actions: error loading friends list.", error);
  }
};

const insertNewFriend = friend => async dispatch => {
  try {
    const newFriend = await addNewFrined(friend);

    dispatch({
      type: friendsConstants.NEW_FRIEND_ADDED_SUCCESSFULLY,
      newFriend
    });
  }
  catch (error) {
    console.log("error adding new friend");
    console.log(error);
  }
};

const insertFriendToGroup = (groupId, friendId) => async dispatch => {
  try {
    await addFriendToGroup(groupId, friendId);

    dispatch({
      type: groupsConstants.FRIEND_ADDED_TO_GROUP
    });
  }
  catch (error) {
    console.log("error adding friend to group");
    console.log(error);
  }
};

const removeFriendById = friendId => async dispatch => {
  try {
    await removeFriend(friendId);

    dispatch({
      type: friendsConstants.FRIEND_REMOVE_SUCCESSFULLY,
      friendId
    });
  }
  catch (error) {
    console.log("error removing friend to group");
    console.log(error);
  }
};

const setNewFriendRadius = radius => ({
  type: friendsConstants.NEWFRIENDRADIUS,
  radius
});

const startAddNewGroupMode = () => ({
  type: groupsConstants.ADD_NEW_GROUP
});

const cancelAddNewGroupMode = () => ({
  type: groupsConstants.CANCEL_ADD_NEW_GROUP
});

const insertNewGroup = groupName => async dispatch => {
  try {
    const newGroup = await addNewGroup(groupName);

    dispatch({
      type: groupsConstants.NEW_GROUP_ADDED,
      newGroup
    });
  }
  catch (error) {
    console.log("error adding new group");
    console.log(error);
  }
};

export const groupsActions = {
  fetchAllGroups,
  fetchFriendsByGroupId,
  fetchAllFriends,
  insertNewFriend,
  insertFriendToGroup,
  removeFriendById,
  setNewFriendRadius,
  insertNewGroup,
  startAddNewGroupMode,
  cancelAddNewGroupMode
};
