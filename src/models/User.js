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
  projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
}, {collection:'User'});


export const User = mongoose.model('User', userSchema);
