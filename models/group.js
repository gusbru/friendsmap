import mongoose from "mongoose";

export const GroupSchema = mongoose.Schema({
  name: { type: String, maxLength: 30, required: true },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "Friend" }]
});

export const Group = mongoose.model("Group", GroupSchema);
