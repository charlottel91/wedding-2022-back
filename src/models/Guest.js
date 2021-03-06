const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const guestSchema = Schema(
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
  {timestamps: true},
  {collection: 'Guest'}
);

module.exports = mongoose.model('Guest', guestSchema);
