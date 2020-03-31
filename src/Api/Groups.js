export const getAllGroups = () =>
  new Promise(async(resolve, reject) => {
    try {
      const allGroups = await fetch("/api/group", {
        method: "GET"
      });

      if (allGroups.ok) {
        const allGroupsList = await allGroups.json();
        resolve(allGroupsList);
      }
      else {
        throw new Error("Error retrieving groups list");
      }
    }
    catch (error) {
      reject(error);
    }
  });

export const getFriendsByGroupId = groupId =>
  new Promise(async(resolve, reject) => {
    try {
      const friendsByGroupId = await fetch(`/api/group/id/${groupId}`, {
        method: "GET"
      });

      if (friendsByGroupId.ok) {
        const [friendsByGroup] = await friendsByGroupId.json();

        resolve(friendsByGroup);
      }
      else {
        throw new Error(`Error retrieving friends from group ${groupId}`);
      }
    }
    catch (error) {
      reject(error);
    }
  });

export const addFriendToGroup = (groupId, friendId) =>
  new Promise(async(resolve, reject) => {
    try {
      const updateFriendList = await fetch(`/api/group/${groupId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ friendId })
      });

      if (updateFriendList.ok) {
        resolve();
      }
      else {
        throw new Error(`Error adding friend ${friendId} to group ${groupId}`);
      }
    }
    catch (error) {
      reject(error);
    }
  });

/**
 * Add a new group to DB and returns the group object.
 * 
 */
export const addNewGroup = (groupName) => new Promise(async(resolve, reject) => {
  try {
    const newGroup = {
      name: groupName
    };

    const addNewGroupRequest = await fetch("/api/group/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newGroup)
    });

    if (addNewGroupRequest.ok) {
      const newGroup = await addNewGroupRequest.json();
      resolve(newGroup);
    }
    else {
      throw new Error(`Error adding new group ${groupName}`);
    }

  }
  catch (error) {
    reject(error);
  }
});
