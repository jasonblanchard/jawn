import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
} from 'graphql';

export default function graphqlSchemaBuilder(entryService, userService) {
  const EntryType = new GraphQLObjectType({
    name: 'Entry',
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
    name: 'User',
    fields: () => ({
      id: { type: GraphQLID },
      username: { type: GraphQLString },
      email: { type: GraphQLString },
      timeCreated: { type: GraphQLString },
    })
  })

  const queryType = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      entries: {
        name: 'entries',
        type: new GraphQLList(EntryType),
        resolve(parentValue, args, request) {
          const userId = '5a400afebf5614778f41f62a';
          // const userId = request.accessTokenPayload.id;
          return entryService.list(userId);
        }
      },
    }
  });

  return new GraphQLSchema({
    query: queryType
  });
}
