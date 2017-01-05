import EntryController from 'app/controllers/EntryController';

export default function(registry) {
  const { store, entryService, logger } = registry;
  return new EntryController(store, entryService, logger, process.env.APP_SECRET);
}
