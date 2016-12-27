const types = [
  'LOAD_ENTRIES_INDEX_PAGE'
];

types.forEach(type => {
  Object.assign(exports, {
    type,
    [type + '_STARTED']: type + '_STARTED',
    [type + '_COMPLETED']: type + '_COMPLETED',
    [type + '_FAILED']: type + '_FAILED',
  });
});
