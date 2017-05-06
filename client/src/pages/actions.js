import http from 'superagent';
import updateState from './updateState';

export default {
  fetchEntries: async function fetchEntries(context) {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU4NmFkNjE0NWQ3OGNkZTAzMWRjMzQzMyIsImlhdCI6MTQ5NDA4MzA1NX0.WUeOO9u440W3_YhIgFXAe5rQlSBwUDsQUihK0MRbYjE';
    await updateState(context, prevState => ({
      ...prevState,
      isFetchingEntries: true,
    }));

    const response = await http.get('/api/entries/').set('Authorization', `Bearer ${token}`);
    const entries = response.body;
    const entryIds = entries.map(entry => entry.id);

    await updateState(context, prevState => ({
      ...prevState,
      entries,
      isFetchingEntries: false,
      entryIds,
    }));
  },

  createEntry: async function createEntry(context, fields) {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU4NmFkNjE0NWQ3OGNkZTAzMWRjMzQzMyIsImlhdCI6MTQ5NDA4MzA1NX0.WUeOO9u440W3_YhIgFXAe5rQlSBwUDsQUihK0MRbYjE';
    await updateState(context, prevState => ({
      ...prevState,
      isEntryCreating: true,
    }));

    const response = await http.post('/api/entries').set('Authorization', `Bearer ${token}`).send(fields);
    const entry = response.body;

    const entries = [entry, ...context.state.entries];
    const entryIds = [entry.id, ...context.state.entryIds];

    await updateState(context, prevState => ({
      ...prevState,
      entries,
      entryIds,
      isEntryCreating: false,
    }));
  },
};
