import { combineReducers } from 'redux'
import currentUserReducer from './slices/currentUserSlice'

const rootReducer = combineReducers({
  currentUser: currentUserReducer,
});

// export state to use with selectors
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;