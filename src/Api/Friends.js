export const getAllFriends = () =>
  new Promise(async (resolve, reject) => {
    try {
      const friendsList = await fetch("/api/friend", {
        method: "GET"
      });

      if (friendsList.ok) {
        const allFriendsList = await friendsList.json();
        resolve(allFriendsList);
      } else {
        throw new Error("Error retrieving friend list");
      }
    } catch (error) {
      reject(error);
    }
  });

/**
 *
 * Add a new friend to database
 * friend object must contain:
 *    - name: String
 *    - lat: number
 *    - lng: number
 *
 * {
 *    name: "friend name",
 *    lat: xx.xxxx
 *    lng: yy.yyyy
 * }
 *
 * @param {object} friend
 */
export const addNewFrined = friend =>
  new Promise(async (resolve, reject) => {
    try {
      const requestAdd = await fetch("/api/friend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(friend)
      });

      if (requestAdd.ok) {
        const newFriend = await requestAdd.json();
        resolve(newFriend);
      } else {
        throw new Error("Error adding new friend");
      }
    } catch (error) {
      console.log(error);
      reject(error.message);
    }
  });

export const removeFriend = friendId =>
  new Promise(async (resolve, reject) => {
    try {
      const removeRequest = await fetch(`/api/friend/${friendId}`, {
        method: "DELETE"
      });

      if (removeRequest.ok) {
        resolve();
      } else {
        throw new Error("Error removing friend");
      }
    } catch (error) {
      console.log(error);
      reject(error.message);
    }
  });
