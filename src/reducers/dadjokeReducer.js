// import login actions
import {
  FETCH_JOKES_START,
  FETCH_JOKES_SUCCESS,
  FETCH_JOKES_FAILURE
} from "../actions/actions";

// create initial login state
const initialState = {
  isFetching: false,
  error: "",
  isLoggedIn: false,
  jokes: null
};

// export login reducer
export const dadjokeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_JOKES_START:
      return {
        ...state,
        isFetching: true,
        error: ""
      };
    case FETCH_JOKES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        jokes: action.payload
      };
    case FETCH_JOKES_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: `Unable to login user: ${action.payload}`
      };
    default:
      return state;
  }
};
