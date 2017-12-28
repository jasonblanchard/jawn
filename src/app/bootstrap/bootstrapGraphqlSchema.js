import graphqlSchemaBuilderNew from 'app/schema/graphqlSchemaBuilderNew';

export default function(registry) {
  return graphqlSchemaBuilderNew(
    registry.entryService,
    registry.userService,
  );
}
