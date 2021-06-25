// meal.js
import {Meal} from "../models/Meal";
//Required for dummy data
const dummy = require('mongoose-dummy');
const ignoredFields = ['_id','created_at', '__v', /detail.*_info/];


export const typeDef = `
  type Meal {
    _id: ID!
    name: String
  }

  input MealInput{
    name: String
  }


  extend type Query {
    mealSchemaAssert: String
    meals: [Meal]
    meal(_id: ID!): Meal
  }

  extend type Mutation {
    createMeal(name: String!): Boolean
    createMealWithInput(input: MealInput!): Meal
    deleteMeal(_id: ID!): Boolean
    updateMeal(_id: ID!,input: MealInput!): Meal
  }

`;

export const resolvers = {
  Query: {
    mealSchemaAssert: async () => {
      return "Meal schema";
    },

    meals: async () => {
      return Meal.find();
    },

    meal: async (root, { _id }, context, info) => {
      
      return Meal.findOne({_id});
    },
  },
  Mutation: {
    createMeal: async (root, args, context, info) => {
      await Meal.create(args);
      return true;
    },

    createMealWithInput: async (root, { input }, context, info) => {
      return Meal.create(input);
    },

    deleteMeal: async (root, { _id }, context, info) => {
      return Meal.remove({ _id });
    },

    updateMeal: async (root, { _id, input }) => {
      return Meal.findByIdAndUpdate(_id, input, { new: true });
    }
  },
};
