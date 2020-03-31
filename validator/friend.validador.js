import { check } from "express-validator";

export const newFriend = [
  check("name")
    .escape()
    .trim()
    .notEmpty()
    .isLength({ max: 30 }),
  check("lat")
    .escape()
    .trim()
    .isNumeric()
    .notEmpty(),
  check("lng")
    .escape()
    .trim()
    .isNumeric()
    .notEmpty(),
  check("radius")
    .escape()
    .trim()
    .isNumeric()
    .optional(),
  check("groups").escape()
];

export const removeFriendFromGroup = [
  check("friendId")
    .escape()
    .trim()
    .notEmpty()
    .isString()
    .isLength({ min: 24, max: 24 }),
  check("groupId")
    .escape()
    .trim()
    .notEmpty()
    .isString()
    .isLength({ min: 24, max: 24 })
];
