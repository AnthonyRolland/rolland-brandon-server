import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    name: String,
    description: String,
    duration: String,
    status: Number,
}, {collection:'Task'});


export const Task = mongoose.model('Task', taskSchema);
