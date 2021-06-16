import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  name: String,
  slogan: String,
  meals: [{ type: Schema.Types.ObjectId, ref: 'Meal'}],
}, {collection:'Restaurant'});


export const Restaurant = mongoose.model('Restaurant', restaurantSchema);
