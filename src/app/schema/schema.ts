import { makeExecutableSchema } from 'graphql-tools';

import EntryService from 'app/services/EntryService';
import UserService from 'app/services/UserService';
import { EntryEntityInputParams } from 'app/services/EntryConnector';

const typeDefs = `
  type User {
    id: ID!
    email: String
    entries: [Entry]
    timeCreated: String
    username: String
  }

  type Entry {
    id: ID!,
    text: String!
    timeCreated: String!
    timeUpdated: String
    user: User
  }

  input EntryInput {
    text: String!
  }

  type Query {
    entries(since: String, before: String): [Entry]
    user(id: ID!): User
  }

  type Mutation {
    updateEntry(id: ID!, input: EntryInput): Entry
    createEntry(input: EntryInput): Entry
    deleteEntry(id: ID!): Entry
  }
`;

type ParentParams = {
  userId: string
}

type Context = {
  userId: string
  services: {
    entryService: EntryService
    userService: UserService
  }
}

const resolvers = {
  Entry: {
    user: (parent: ParentParams, _args: any, context: Context) => {
      return context.services.userService.findById(parent.userId);
    },
  },
  User: {
    entries: (parent: ParentParams, _args: { id: string }, context: Context) => {
      return context.services.entryService.listByUser(parent.userId);
    },
  },
  Query: {
    entries: (_parent: ParentParams, args: { since: string, before: string }, context: Context) => {
      const { since, before } = args;
      return context.services.entryService.listByUser(context.userId, { since, before });
    },
    user: (_parent: ParentParams, args: { id: string }, context: Context) => {
      return context.services.userService.findById(args.id);
    },
  },
  Mutation: {
    updateEntry: (_parent: ParentParams, args: { id: string, input: EntryEntityInputParams }, context: Context) => {
      return context.services.entryService.update(args.id, args.input, context.userId);
    },
    createEntry: (_parent: ParentParams, args: { input: EntryEntityInputParams }, context: Context) => {
      return context.services.entryService.create(args.input, context.userId);
    },
    deleteEntry: (_parent: ParentParams, args: { id: string }, context: Context) => {
      return context.services.entryService.delete(args.id, context.userId);
    },
  },
};

export default makeExecutableSchema({
  typeDefs,
  resolvers,
});
