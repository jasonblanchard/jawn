export default function(state) {
  const currentUser = state.get('currentUser');
  return currentUser ? currentUser.toJS() : undefined;
}
