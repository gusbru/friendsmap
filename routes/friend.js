import express from "express";
import { validationResult } from "express-validator";
import { Friend } from "../models/friend";
import { Group } from "../models/group";
import validator from "../validator";

const router = express.Router();

/**
 *
 * Fetch all friends
 *
 */
router.get("/", async (req, res) => {
  try {
    // to remove a field use .select("-groups")
    const friendList = await Friend.find();

    res.json(friendList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  } finally {
    res.end();
  }
});

/**
 * Add a new friend
 *
 * Fields:
 * - name: String (required)
 * - lat: Number (required)
 * - lng: Number (required)
 * - radius: Number (optional, default=10)
 * - groupId: String (optional. If not given do
 *                    not add the friend to a group)
 *
 */
router.post("/", validator.newFriend, async (req, res) => {
  const resultValidator = validationResult(req);
  if (!resultValidator.isEmpty()) {
    return res
      .status(422)
      .json({ error: resultValidator.array() })
      .end();
  }
  try {
    const { name, lat, lng, radius, groupId } = req.body;

    const friendDB = new Friend({ name, lat, lng, radius });
    await friendDB.save();

    // add the new friend to a group
    if (groupId) {
      const friendId = friendDB._id;
      // find the group
      const groupDB = await Group.findById(groupId);

      if (groupDB) {
        // add a friend
        await groupDB.friends.push(friendId);

        // add the group to friend groups array
        await friendDB.groups.push(groupDB._id);

        // save the changes
        await groupDB.save();
        await friendDB.save();
      }
    }

    res.json(friendDB);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  } finally {
    res.end();
  }
});

/**
 * Remove a friend by id.
 * Also remove all groups the removed friend belongs
 *
 */
router.delete("/:friendId", async (req, res) => {
  try {
    const { friendId } = req.params;

    // find the friend
    const friendToRemove = await Friend.findById(friendId);
    if (!friendToRemove) throw new Error("friend not found");

    // remove it from all registered groups
    const groupsToRemoveFrom = friendToRemove.groups;

    // find all groups
    for (let i = 0; i < groupsToRemoveFrom.length; i++) {
      const gId = groupsToRemoveFrom[i];
      const groupDB = await Group.findById(gId);
      if (!groupDB) continue;

      groupDB.friends = groupDB.friends.filter(
        group => !group.equals(friendId)
      );

      // save update to group
      await groupDB.save();
    }

    // remove the friend
    await friendToRemove.remove();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  } finally {
    res.end();
  }
});

/**
 * Remove a friend from a group.
 * Do not remove the friend itself
 *
 * body: {
 *     friendId: "friendIdCode",
 *     groupId: "groupIdCode"
 * }
 *
 */
router.put("/", validator.removeFriendFromGroup, async (req, res) => {
  const resultValidator = validationResult(req);
  if (!resultValidator.isEmpty()) {
    return res
      .status(422)
      .json({ error: resultValidator.array() })
      .end();
  }
  try {
    const { friendId, groupId } = req.body;

    const friendDB = await Friend.findById(friendId);
    if (!friendDB) throw new Error("friend not found");

    // find the group
    const groupDB = await Group.findById(groupId);
    if (!groupDB) throw new Error("group not found");

    // upgrade group
    groupDB.friends = groupDB.friends.filter(group => !group.equals(friendId));
    await groupDB.save();

    // update friend
    friendDB.groups = friendDB.groups.filter(group => !group.equals(groupId));
    await friendDB.save();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  } finally {
    res.end();
  }
});

export default router;
