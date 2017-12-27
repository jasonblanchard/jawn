import {
  graphql,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
} from 'graphql';

export default function graphqlSchemaBuilder(entryService, userService) {
  const EntryType = new GraphQLObjectType({
    name: 'EntryType',
    fields: () => ({
      id: { type: GraphQLID },
      text: { type: GraphQLString },
      timeCreated: { type: GraphQLString },
      timeUpdated: { type: GraphQLString },
      user: {
        type: UserType,
        resolve(entry) {
          return userService.findById(entry.userId);
        }
      }
    })
  });

  const UserType = new GraphQLObjectType({
    name: 'UserType',
    fields: () => ({
      id: { type: GraphQLID },
      username: { type: GraphQLString },
      email: { type: GraphQLString },
      timeCreated: { type: GraphQLString },
    })
  });

  const EntriesQueryType = {
    name: 'EntriesQueryType',
    type: new GraphQLList(EntryType),
    resolve(parentValue, args, request) {
      const userId = '5a400afebf5614778f41f62a';
      return entryService.list(userId);
    }
  };

  const EntryInputType = new GraphQLInputObjectType({
    name: 'EntryInputType',
    fields: {
      text: { type: GraphQLString },
    }
  })

  const UpdateEntryMutationQueryType = {
    name: 'UpdateEntryMutationQueryType',
    type: EntryType,
    args: {
      id: { type: GraphQLID },
      input: { type: EntryInputType },
    },
    resolve(parentValue, args, request) {
      const userId = '5a400afebf5614778f41f62a';
      return entryService.update(args.id, userId, args.input);
    }
  }

  const CreateEntryMutationQuery = {
    name: 'CreateEntryMutationQuery',
    type: EntryType,
    args: {
      input: { type: EntryInputType },
    },
    resolve(parentValue, args, request) {
      const userId = '5a400afebf5614778f41f62a';
      return entryService.create(args.input, userId);
    }
  }

  const RootQueryType = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      entries: EntriesQueryType
    }
  });

  const RootMutationType = new GraphQLObjectType({
    name: 'RootMutationType',
    fields: {
      updateEntry: UpdateEntryMutationQueryType,
      createEntry: CreateEntryMutationQuery,
    }
  })

  return new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType,
  });
}