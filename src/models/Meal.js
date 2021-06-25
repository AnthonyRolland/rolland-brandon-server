import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const mealSchema = new Schema({
    name: String,
}, {collection:'Meal'});


export const Meal = mongoose.model('Meal', mealSchema);
