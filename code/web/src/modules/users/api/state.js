// Imports

// App Imports
import {
  USERS_GET_LIST_REQUEST,
  USERS_GET_LIST_RESPONSE,
  USERS_GET_LIST_FAILURE,
  USERS_GET_REQUEST,
  USERS_GET_RESPONSE,
  USERS_GET_FAILURE,
} from './actions'

// users list

// Initial State
const usersInitialState = {
  isLoading: false,
  error: null,
  list: []
}

// State
export const users = (state = usersInitialState, action) => {
  switch (action.type) {
    case USERS_GET_LIST_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading,
        error: null
      }

    case USERS_GET_LIST_RESPONSE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        list: action.list
      }

    case USERS_GET_LIST_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }

    default:
      return state
  }
}



// Single user

// Initial State
const userInitialState = {
  isLoading: false,
  error: null,
  item: {}
}

// State
export const user = (state = userInitialState, action) => {
  switch (action.type) {
    case USERS_GET_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading,
        error: null
      }

    case USERS_GET_RESPONSE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        item: action.item
      }

    case USERS_GET_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }

    default:
      return state
  }
}