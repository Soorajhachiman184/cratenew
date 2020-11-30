// Imports
import axios from 'axios'
import { query, mutation } from 'gql-query-builder'

// App Imports
import { routeApi } from '../../../setup/routes'

// Actions Types
export const USERS_GET_LIST_REQUEST = 'USERS/GET_LIST_REQUEST'
export const USERS_GET_LIST_RESPONSE = 'USERS/GET_LIST_RESPONSE'
export const USERS_GET_LIST_FAILURE = 'USERS/GET_LIST_FAILURE'
export const USERS_GET_REQUEST = 'USERS/GET_REQUEST'
export const USERS_GET_RESPONSE = 'USERS/GET_RESPONSE'
export const USERS_GET_FAILURE = 'USERS/GET_FAILURE'

// Actions

// Get list of USERS
export function getList(isLoading = true) {
  return dispatch => {
    dispatch({
      type: USERS_GET_LIST_REQUEST,
      error: null,
      isLoading
    })

    return axios.post(routeApi, query({
      operation: 'users',
      fields: ['id','name','email','createdAt', 'updatedAt']
    }))
      .then(response => {
        if (response.status === 200) {
          dispatch({
            type: USERS_GET_LIST_RESPONSE,
            error: null,
            isLoading: false,
            list: response.data.data.users
          })
        } else {
          console.error(response)
        }
      })
      .catch(error => {
        dispatch({
          type: USERS_GET_LIST_FAILURE,
          error: 'Some error occurred. Please try again.',
          isLoading: false
        })
      })
  }
}


// Get single USER
export function get(slug, isLoading = true) {
  return dispatch => {
    dispatch({
      type: USERS_GET_REQUEST,
      isLoading
    })

    return axios.post(routeApi, query({
      operation: 'user',
      variables: { slug },
      fields: ['id', 'name', 'email', 'createdAt', 'updatedAt']
    }))
      .then(response => {
        dispatch({
          type: USERS_GET_RESPONSE,
          error: null,
          isLoading: false,
          item: response.data.data.user
        })
      })
      .catch(error => {
        dispatch({
          type: USERS_GET_FAILURE,
          error: 'Some error occurred. Please try again.',
          isLoading: false
        })
      })
  }
}

// // Create subscription
// export function create(variables) {
//   return dispatch => {
//     return axios.post(routeApi, mutation({
//       operation: 'subscriptionCreate',
//       variables,
//       fields: ['id']
//     }))
//   }
// }

// // Remove subscription
// export function remove(variables) {
//   return dispatch => {
//     return axios.post(routeApi, mutation({
//       operation: 'subscriptionRemove',
//       variables,
//       fields: ['id']
//     }))
//   }
// }
