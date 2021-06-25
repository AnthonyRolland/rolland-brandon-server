// user.js
import {User} from "../models/User";
//Required for dummy data
const dummy = require('mongoose-dummy');
const ignoredFields = ['_id','created_at', '__v', /detail.*_info/];


export const typeDef = `
  type User {
    _id: ID!
    name: String
    surname: String
    login: String
    pass: String
    restaurants: [Restaurant]
  }

  input UserInput{
    name: String
    surname: String
    login: String
    pass: String
    token: String
  }


  extend type Query {
    userSchemaAssert: String
    users: [User]
    user(_id: ID!): User
  }

  extend type Mutation {
    createUser(name: String!,surname: String!): String
    createUserWithInput(input: UserInput!): String
    deleteUser(_id: ID!): Boolean
    updateUser(_id: ID!, input: UserInput!): String
    addMeal(_id: ID!, meal: MealInput): User
  }

`;

export const resolvers = {
  Query: {
    userSchemaAssert: async () => {
      return "Hello world, from User schema";
    },

    users: async () => {
      return User.find();
    },

    user: async (root, { _id }, context, info) => {
      return User.findOne({ _id });

    },
  },
  Mutation: {
    createUser: async (root, args, context, info) => {
      await User.create(args);
      return User.name;
    },

    createUserWithInput: async (root, { input }, context, info) => {
      await User.create(input);

      return User.name;
    },

    deleteUser: async (root, { _id }, context, info) => {
      const { deletedCount } = await User.deleteOne({ _id });

      return deletedCount === 0 ? false : true;
    },

    updateUser: async (root, { _id, input }) => {
      await User.findByIdAndUpdate(_id, input, { new: true });

      return User.name;
    },

    addMeal: async (root, { _id, meal }) => {
      return User.findByIdAndUpdate(_id, meal, { new: true });
    },
  }
};

/*

DATA EXPLORATION
Use on graphql web page

# Write your query or mutation here
query GetAllUsers{
  users{
    _id
    name  
    surname
  }
}

# Write your query or mutation here
query GetOneUserByID{
  user(_id : "5e9deb26930d0e19e49d8373"){
    _id
    name
    surname
  }
}

mutation CreateUser{
  createUser(name: "MyFirstUser",  login: "first.user")
}

*/
