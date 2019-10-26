// import reducers
import { combineReducers } from 'redux'
import { loginReducer } from './loginReducer'

// export combined reducers
export default combineReducers({
    login: loginReducer
})