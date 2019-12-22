// import reducers
import { combineReducers } from "redux";
import { loginReducer } from "./loginReducer";
import { signupReducer } from "./signupReducer";

// export combined reducers
export default combineReducers({
  login: loginReducer,
  signup: signupReducer
});
