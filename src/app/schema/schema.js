import { makeExecutableSchema} from 'graphql-tools';

const typeDefs = `
  type User {
    id: ID!
    username: String!
    email: String!
    timeCreated: String!
    entries: [Entry]
  }

  type Entry {
    id: ID!,
    text: String
    timeCreated: String!
    timeUpdated: String
    user: User
  }

  input EntryInput {
    text: String!
  }

  type Query {
    entries: [Entry]
    user(id: ID!): User
  }

  type Mutation {
    updateEntry(id: ID!, input: EntryInput): Entry
    createEntry(input: EntryInput): Entry
  }
`;

const resolvers = {
  Entry: {
    user: (parent, args, context) => {
      return context.services.userService.findById(parent.userId);
    }
  },
  User: {
    entries: (parent, args, context) => {
      return context.services.entryService.listByUser(parent.id);
    }
  },
  Query: {
    entries: (parent, args, context) => {
      return context.services.entryService.listByUser(context.userId);
    },
    user: (parent, args, context) => {
      return context.services.userService.findById(args.id);
    }
  },
  Mutation: {
    updateEntry: (parent, args, context) => {
      return {};
    },
    createEntry: (parent, args, context) => {
      return {};
    }
  },
}

export default makeExecutableSchema({
  typeDefs,
  resolvers
})