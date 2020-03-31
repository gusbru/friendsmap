import { check, param } from "express-validator";

export const newGroup = [
  check("name")
    .escape()
    .trim()
    .notEmpty()
    .isLength({ max: 30 }),
  check("friends")
    .escape()
    .isArray()
    .optional()
];

export const addFriendsToGroup = [
  param("groupId")
    .escape()
    .trim()
    .isLength({ min: 24, max: 24 }),
  check("friendId")
    .escape()
    .trim()
    .isLength({ min: 24, max: 24 })
];
