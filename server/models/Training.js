const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  name: { type: String, required: true, unique: true },
  trainer: { type: String, required: true },
  exercises: { type: Array,required: true},
    description:{type:String,required: true},
  date: { type: Date, default: Date.now },
  category: { type: String, required: true, },
  owner: { type: Types.ObjectId, ref: "User" },
});

module.exports = model("Training", schema);
