import reduceCreateEntry from './reduceCreateEntry';
import reduceFetchEntries from './reduceFetchEntries';
import reduceUpdateEntry from './reduceUpdateEntry';

export default {
  CREATE_ENTRY: reduceCreateEntry,
  FETCH_ENTRIES: reduceFetchEntries,
  UPDATE_ENTRY: reduceUpdateEntry
}
