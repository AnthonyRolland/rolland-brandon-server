// meal.js
import {Meal} from "../models/Meal";
//Required for dummy data
const dummy = require('mongoose-dummy');
const ignoredFields = ['_id','created_at', '__v', /detail.*_info/];


export const typeDef = `
  type Meal {
    _id: ID!
    name: String
    description: String
    type: String
    price: Int
  }

  input MealInput{
    name: String
    description: String
    type: String
    price: Int
  }


  extend type Query {
    mealSchemaAssert: String
    meals: [Meal]
    meal(_id: ID!): Meal
  }

  extend type Mutation {
    createMeal(name: String!,description: String!): Boolean
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
      let meals = [];
      for (let index = 0; index < 5; index++) {
        meals.push(dummy(Meal, {
          ignore: ignoredFields,
          returnDate: true
        }))
      } 
      return meals;
    },
    meal: async (root, { _id }, context, info) => {
      
      return Meal.findOne({_id});
      return dummy(Meal, {
        ignore: ignoredFields,
        returnDate: true
      })
    },
  },
  Mutation: {
    createMeal: async (root, args, context, info) => {
      await Meal.create(args);
      return Meal.name;
    },
    createMealWithInput: async (root, { input }, context, info) => {
      //input.password = await bcrypt.hash(input.password, 10);
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
