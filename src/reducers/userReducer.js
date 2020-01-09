const userReducer = (state = { name: "", password: "", inProgress: false, loggedIn: false }, action) => {
  switch(action.type) {
    case 'LOGGING_IN':
      return {
        ...state,
        inProgress: true
      }

    case 'LOGGED_IN':
      return {
        ...state,
        inProgress: false,
        loggedIn: true
      }

    case 'LOGIN_FAILED':
      return {
        ...state,
        inProgress: false,
        loggedIn: false
      }

    case 'CHECKING_TOKEN':
      return {
        ...state,
        inProgress: true
      }

    case 'LOG_OUT':
      return {
        name: "",
        password: "",
        inProgress: false,
        loggedIn: false
      }

    default:
      return state;
  }
}

export default userReducer;