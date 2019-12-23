// import reducers
import { combineReducers } from 'redux'
import { loginReducer } from './loginReducer'
import { signupReducer } from './signupReducer'
import { dadjokeReducer } from './dadjokeReducer'

// export combined reducers
export default combineReducers({
  login: loginReducer,
  signup: signupReducer,
  jokes: dadjokeReducer,
})
