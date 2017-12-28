import graphqlSchemaBuilder from 'app/schema/graphqlSchemaBuilder';

export default function(registry) {
  return graphqlSchemaBuilder(
    registry.entryService,
    registry.userService,
  );
}
