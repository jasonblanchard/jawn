import GraphqlService from 'app/services/GraphqlService';

export default function(registry) {
  const { logger, store } = registry;
  return new GraphqlService({ store, logger });
}
