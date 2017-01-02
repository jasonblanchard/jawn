import reduceCreateEntry from './reduceCreateEntry';
import reduceDeleteEntry from './reduceDeleteEntry';
import reduceFetchEntries from './reduceFetchEntries';
import reduceUpdateEntry from './reduceUpdateEntry';

export default {
  CREATE_ENTRY: reduceCreateEntry,
  DELETE_ENTRY: reduceDeleteEntry,
  FETCH_ENTRIES: reduceFetchEntries,
  UPDATE_ENTRY: reduceUpdateEntry,
};
