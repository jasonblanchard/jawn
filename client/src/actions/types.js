const types = [
  'CREATE_ENTRY',
  'FETCH_ENTRIES'
];

types.forEach(type => {
  Object.assign(exports, {
    type,
    [type + '_STARTED']: type + '_STARTED',
    [type + '_COMPLETED']: type + '_COMPLETED',
    [type + '_FAILED']: type + '_FAILED',
  });
});
