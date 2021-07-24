const mongodb = require('mongodb');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectID = mongodb.ObjectID;

const userSchema = Schema(
  {
    name:{
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    password: { 
      type: String, 
      required: true,
      select: false,
    },
    guests: [{
      type: ObjectID,
      ref: 'Guest'
    }],
    isCarpooling: [{
      type: ObjectID,
      ref: 'Carpooling',
      unique: true
    }]
  },
  {collection: 'User'}
);

module.exports = mongoose.model('User', userSchema);
