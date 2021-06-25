// restaurant.js
import {Restaurant} from "../models/Restaurant";
import { Meal } from "../models/Meal";
//Required for dummy data
const dummy = require('mongoose-dummy');
const ignoredFields = ['_id','created_at', '__v', /detail.*_info/];


export const typeDef = `
  type Restaurant {
    _id: ID!
    name: String
    slogan: String
    meals: [Meal]
  }

  input RestaurantInput{
    name: String
    slogan: String
  }


  extend type Query {
    restaurantSchemaAssert: String
    restaurants: [Restaurant]
    restaurant(_id: ID!): Restaurant
  }

  extend type Mutation {
    createRestaurant(name: String!,slogan: String!): Boolean
    createRestaurantWithInput(input: RestaurantInput!): Restaurant
    deleteRestaurant(_id: ID!): Boolean
    updateRestaurant(_id: ID!,input: RestaurantInput!): Restaurant
    addMealToRestaurant(_id: ID!,input: MealInput!): Boolean
  }

`;

export const resolvers = {
  Query: {
    restaurantSchemaAssert: async () => {
      return "Restaurant schema";
    },

    restaurants: async () => {
      var test =  await Restaurant.find().populate('meals');
      return test;
    },

    restaurant: async (root, { _id }, context, info) => {
      return await Restaurant.findOne({_id}).populate('meals');
    }
  },
  Mutation: {
    createRestaurant: async (root, args, context, info) => {
      await Restaurant.create(args);
      return true;
    },

    createRestaurantWithInput: async (root, { input }, context, info) => {
      return Restaurant.create(input);
    },

    deleteRestaurant: async (root, { _id }, context, info) => {
      const { deletedCount } = await Restaurant.deleteOne({ _id });

      return deletedCount === 0 ? false : true;
    },

    updateRestaurant: async (root, { _id, input }) => {
      return Restaurant.findByIdAndUpdate(_id, input, { new: true });
    },
      
    addMealToRestaurant: async (root, { _id, input }) => {
      var meal = await Meal.create(input);
      var restaurant = await Restaurant.findByIdAndUpdate(_id,{
        $push: {
          meals: meal
        }
      })
      restaurant.save();
      return true;
    },
  },
};
