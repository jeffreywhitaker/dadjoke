// import reducers
import { combineReducers } from 'redux'
import { loginReducer } from './loginReducer'
import { dadjokeReducer } from './dadjokeReducer'

// export combined reducers
export default combineReducers({
  loginReducer: loginReducer,
  jokeReducer: dadjokeReducer,
})
