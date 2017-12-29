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

export default function buildGraphqlSchema(entryService, userService) {
  const resolvers = {
    Entry: {
      user: (parent, args, context) => {
        return context.loaders.userLoader.load(parent.userId);
      }
    },
    User: {
      entries: (parent, args, context) => {
        return entryService.list(parent.id);
      }
    },
    Query: {
      entries: (parent, args, context) => {
        return entryService.list(context.userId);
      },
      user: (parent, args, context) => {
        return userService.findById(args.id);
      }
    },
    Mutation: {
      updateEntry: (parent, args, context) => {
        return entryService.update(args.id, context.userId, args.input);
      },
      createEntry: (parent, args, context) => {
        return entryService.create(args.input, context.userId);
      }
    },
  }

  return makeExecutableSchema({
    typeDefs,
    resolvers
  })
}
