// import reducers
import { combineReducers } from 'redux'
import { loginReducer } from './loginReducer'
// import { dadjokeReducer } from './dadjokeReducer'

// export combined reducers
const rootReducer = combineReducers({
  loginReducer: loginReducer,
  // jokeReducer: dadjokeReducer,
})
export default rootReducer

export type RootState = ReturnType<typeof rootReducer>
