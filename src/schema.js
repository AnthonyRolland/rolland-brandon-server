import { merge } from 'lodash';
import { makeExecutableSchema } from 'graphql-tools';

// User typedefs and resolvers
import {
  typeDef as User,
  resolvers as userResolvers,
} from './schema/user.schema';

import {
  typeDef as Restaurant,
  resolvers as restaurantResolvers,
} from './schema/restaurant.schema';

import {
  typeDef as Meal,
  resolvers as mealResolvers,
} from './schema/meal.schema';

// Add more schema and model here
//....
//....

// General query
const Query = `
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }

  type Subscription {
    _empty: String
  }
`;

const resolvers = {};

// Do not forget to merge at the end of typeDefs and resolvers
export const schema = makeExecutableSchema({
  typeDefs: [ Query, User, Restaurant, Meal],
  resolvers: merge(resolvers, userResolvers, restaurantResolvers, mealResolvers),
});