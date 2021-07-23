const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const carpoolingSchema = Schema(
  {
    role: {
      type: String,
      enum: ['DRIVER', 'PASSENGER'],
    },
    place: {
      type: String,
    }
  },
  {timestamps: true},
  {collection: 'Carpooling'}
);

module.exports = mongoose.model('Carpooling', carpoolingSchema);
