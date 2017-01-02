import reduceCreateEntry from './reduceCreateEntry';
import reduceDeleteEntry from './reduceDeleteEntry';
import reduceFetchEntries from './reduceFetchEntries';
import reduceLogin from './reduceLogin';
import reduceUpdateEntry from './reduceUpdateEntry';

export default {
  CREATE_ENTRY: reduceCreateEntry,
  DELETE_ENTRY: reduceDeleteEntry,
  FETCH_ENTRIES: reduceFetchEntries,
  LOGIN: reduceLogin,
  UPDATE_ENTRY: reduceUpdateEntry,
};
