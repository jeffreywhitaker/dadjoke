// import reducers
import { combineReducers } from 'redux'
import { loginReducer } from './loginReducer'
import { configureStore } from '@reduxjs/toolkit'
// import { dadjokeReducer } from './dadjokeReducer'

// export combined reducers
const reducer = combineReducers({
  loginReducer: loginReducer,
  // jokeReducer: dadjokeReducer,
})
export default reducer

export const store = configureStore({ reducer })

export type RootState = ReturnType<typeof reducer>
