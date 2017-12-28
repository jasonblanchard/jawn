import { makeExecutableSchema} from 'graphql-tools';

export default function graphqlSchemaBuilderNew(entryService, userService) {
  const typeDefs = `
    type User {
      id: ID!
      username: String!
      email: String!
      timeCreated: String!
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
    }

    type Mutation {
      updateEntry(id: ID!, input: EntryInput): Entry
      createEntry(input: EntryInput): Entry
    }
  `;

  const resolvers = {
    Entry: {
      user: (parent, args, context) => {
        return userService.findById(parent.userId);
      }
    },
    Query: {
      entries: (parent, args, context) => {
        return entryService.list(context.userId);
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
