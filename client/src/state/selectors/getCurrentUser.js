export default function(state) {
  const currentUser = state.app.get('currentUser');
  return currentUser ? currentUser.toJS() : undefined;
}
