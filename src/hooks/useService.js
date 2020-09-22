import { useCallback, useReducer } from 'react'
import { Services } from '../service'

const initialState = {
  data: null,
  headers: null,
  status: 'idle',
  error: null
}

function reducer(state, action) {
  switch (action.type) {
    case 'GET_REQUEST':
      return {
        ...state,
        error: null,
        status: 'pending'
      }
    case 'GET_REQUEST_SUCCESS':
      return {
        ...state,
        ...action.payload,
        status: 'resolved'
      }
    case 'GET_REQUEST_FAILURE':
      return {
        ...state,
        status: 'rejected',
        error: action.payload
      }
    default:
      throw new Error(`There is no action type : ${action.type}`)
  }
}

const mapService = type => {
    
  switch (type) {
    case 'GET':
      return Services().get
    case 'POST':
      return Services().post
    default:
      throw new Error(`Invalid service type for ${type}`)
  }
}

const useGet = (type = 'GET', url, params = {}) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  
  const dispatchAction = useCallback((actionParams = {}) => {
      console.log('asd')
    // dispatch({ type: 'GET_REQUEST' })
    // mapService(type)(url, { ...params, ...actionParams })
    //   .then(({ data, headers }) => {
        
    //     dispatch({ type: 'GET_REQUEST_SUCCESS', payload: { data, headers } })
    //   })
    //   .catch(e => {
    //     console.error(e)
    //     dispatch({ type: 'GET_REQUEST_FAILURE', payload: e })
    //   })
  }, [url, params, type])

  return { ...state, dispatchAction }
}

export default useGet