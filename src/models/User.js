const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = Schema(
  {
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
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
