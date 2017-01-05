import EntryService from 'app/services/EntryService';

export default function(registry) {
  const { store, logger } = registry;
  return new EntryService(store, logger);
}
