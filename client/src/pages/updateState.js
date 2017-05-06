export default function updateState(context, nextState) {
  return new Promise(resolve => {
    context.setState(nextState, () => { resolve(); });
  });
}
