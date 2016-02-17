var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
});

var User = mongoose.model("User", userSchema);

module.exports = User;
