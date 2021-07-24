const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const carpoolingSchema = Schema(
  {
    role: {
      type: String,
      enum: ['DRIVER', 'PASSENGER'],
    },
    city: {
      type: String,
      trim: true,
    },
    nb_seat: {
      type: Number,
    }
  },
  {timestamps: true},
  {collection: 'Carpooling'}
);

module.exports = mongoose.model('Carpooling', carpoolingSchema);
