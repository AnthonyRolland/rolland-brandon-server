import mongoose from 'mongoose';
const dummy = require('mongoose-dummy');
const ignoredFields = ['_id','created_at', '__v', /detail.*_info/];
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  surname: String,
  pseudo: String,
  password: String,
  token: String,
  restaurants: [{ type: Schema.Types.ObjectId, ref: 'Restaurant' }],
}, {collection:'User'});


export const User = mongoose.model('User', userSchema);
