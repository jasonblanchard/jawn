export default function(state = {}, action) {
  switch (action.type) {
    case 'SET':
      return { ...state, ...{ [action.key]: action.value } };
    default:
      return state;
  }
}
