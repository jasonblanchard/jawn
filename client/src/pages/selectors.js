export default {
  getEntries(state) {
    return state ? state.entries || [] : [];
  },

  isEntryCreating(state) {
    return state && state.isEntryCreating;
  },
};
