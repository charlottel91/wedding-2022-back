const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = Schema(
  {
    firstname: {
      type: String,
      unique: true,
    },
    lastname: {
      type: String,
      unique: true,
    },
    isChild: {
      type: Boolean,
    },
    isVegetarian: {
      type: Boolean,
    },
    presentBrunch: {
      type: Boolean,
    }
  },
  {timestamps: true}
);

module.exports = mongoose.model('User', userSchema);
