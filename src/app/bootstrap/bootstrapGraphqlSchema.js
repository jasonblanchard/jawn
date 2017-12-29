import buildGraphqlSchema from 'app/schema/buildGraphqlSchema';

export default function(registry) {
  return buildGraphqlSchema(
    registry.entryService,
    registry.userService,
  )
}
