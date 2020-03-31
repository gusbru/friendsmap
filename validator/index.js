import { newFriend, removeFriendFromGroup } from "./friend.validador";
import { newGroup, addFriendsToGroup } from "./group.validator";

const validator = {
  newFriend,
  removeFriendFromGroup,
  newGroup,
  addFriendsToGroup
};

export default validator;
