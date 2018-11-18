export default function(state, action) {
  switch (action.type) {
    case 'ENTRY_FORM_CHANGED':
      return { ...state, isEntryFormIsSaving: true };
    case 'UPDATE_ENTRY_COMPLETE':
      return { ...state, isEntryFormIsSaving: false };
    default:
      return state;
  }
}
