import { Store } from 'redux';
import { RootState } from '../rootReducer';

export default function observeStore<State>(
  store: Store,
  select: (rootState: RootState) => State,
  onChange: (state: State) => void
) {
  let currentState: State;

  function handleChange() {
    const nextState = select(store.getState());
    if (nextState !== currentState) {
      currentState = nextState;
      onChange(currentState);
    }
  }

  const unsubscribe = store.subscribe(handleChange);
  handleChange();
  return unsubscribe;
}
