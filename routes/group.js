import express from "express";
import { validationResult } from "express-validator";
const router = express.Router();
import validator from "../validator";
import { Group } from "../models/group";

/**
 * Get all groups without their members
 *
 */
router.get("/", async (req, res, next) => {
  try {
    const groupList = await Group.find();
    res.json(groupList).end();
  } catch (error) {
    console.error("[GET][/api/group/]", error);
    error.message = "Error getting list of groups";
    error.code = 500;
    next(error);
  }
});

/**
 * Get all groups with all their members
 *
 */
router.get("/all", async (req, res, next) => {
  try {
    const groupList = await Group.find().populate("friends");

    res.json(groupList);
  } catch (error) {
    console.error("[GET][/api/group/all]", error);
    error.message = "Error getting list of groups with their members";
    error.code = 500;
    next(error);
  }
});

/**
 * Get a friend list belonging to a specific group by its id
 *
 */
router.get("/id/:groupId", async (req, res, next) => {
  const { groupId } = req.params;
  try {
    const group = await Group.find({ _id: groupId }).populate("friends");

    res.json(group);
  } catch (error) {
    console.error(`[GET][/api/group/id/${groupId}]`, error);
    error.message = `Error getting list members of a specific group (${groupId})`;
    error.code = 500;
    next(error);
  }
});

/**
 * Get one or more groups by its name
 * If more than one group have the same name,
 * return all of them.
 *
 */
router.get("/name/:groupName", async (req, res, next) => {
  const { groupName } = req.params;
  try {
    const group = await Group.find({ name: groupName }).populate("friends");

    res.json(group);
  } catch (error) {
    console.error(`[GET][/api/group/${groupName}]`, error);
    error.message = `Error getting group(s) by name (${groupName})`;
    error.code = 500;
    next(error);
  }
});

/**
 * Create a new group.
 * If a friend list is given, add the friends to the group.
 * The friend list is an array of friend id
 *
 */
router.post("/", validator.newGroup, async (req, res, next) => {
  const resultValidator = validationResult(req);
  if (!resultValidator.isEmpty()) {
    return res
      .status(422)
      .json({ error: resultValidator.array() })
      .end();
  }
  const { name, friendList } = req.body;
  try {
    const groupDB = new Group({ name });

    if (friendList) {
      friendList.forEach(friendId => {
        groupDB.friends.push(friendId);
      });
    }

    await groupDB.save();

    res.json(groupDB);
  } catch (error) {
    console.error(`[POST][/api/group]`, error);
    error.message = `Error creating new group (${name})`;
    error.code = 500;
    next(error);
  }
});

/**
 * add a friend (or a group of them) to a group.
 * Add and existing friend to an existing group.
 * groupId is given in the URL and the
 * friend id is given in the payload.
 * If a single friend is going to be added, only a string
 * can be given in the payload. On the other side, if a
 * group of friends will be added, them an array of friendId
 * must be given.
 *
 */
router.put("/:groupId", validator.addFriendsToGroup, async (req, res, next) => {
  const resultValidator = validationResult(req);
  if (!resultValidator.isEmpty()) {
    return res
      .status(422)
      .json({ error: resultValidator.array() })
      .end();
  }

  try {
    const { friendId } = req.body;
    const { groupId } = req.params;
    // find the group
    const groupDB = await Group.findById(groupId);

    if (typeof friendId === "string") {
      // add a friend
      groupDB.friends.push(friendId);
    }

    if (Array.isArray(friendId)) {
      friendId.forEach(id => {
        groupDB.friends.push(id);
      });
    }

    // save
    await groupDB.save();
    res.end();
  } catch (error) {
    console.error(`[POST][/api/group/:groupId]`, error);
    error.message = `Error adding the friend ${friendId} into the group (${groupId})`;
    error.code = 500;
    next(error);
  }
});

export default router;
