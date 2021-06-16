import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const mealSchema = new Schema({
    name: String,
    description: String,
    type: String,
    price: Number,
}, {collection:'Meal'});


export const Meal = mongoose.model('Meal', mealSchema);
