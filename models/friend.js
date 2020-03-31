import mongoose from "mongoose";

export const FriendSchema = mongoose.Schema({
  name: { type: String, maxLength: 30, required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  radius: { type: Number, default: 10 },
  groups: [{ type: mongoose.Schema.Types.ObjectId, ref: "Group" }]
});

export const Friend = mongoose.model("Friend", FriendSchema);
