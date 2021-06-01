const mongodb = require('mongodb');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectID = mongodb.ObjectID;

const userSchema = Schema(
  {
    name:{
      type: String,
      required: true
    },
    password: { 
      type: String, 
      required: true 
    },
    guest: [{
      type: ObjectID,
      ref: 'Guest'
    }]
  },
  {collection: 'User'}
);

module.exports = mongoose.model('User', userSchema);
