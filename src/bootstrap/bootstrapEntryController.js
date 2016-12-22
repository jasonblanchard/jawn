import EntryController from 'src/controllers/EntryController';

export default function(registry) {
  const { store, entryService, logger } = registry;
  return new EntryController(store, entryService, logger);
}
