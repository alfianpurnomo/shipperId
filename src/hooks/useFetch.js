import { useEffect, useState, useCallback, useReducer } from 'react'
import { useLocation } from 'react-router-dom'
import qs from 'query-string'
import { Services } from '../service'

const fromEntries = require('fromentries')

const initialState = {
  data: null,
  status: 'idle',
  error: null,
  totalPage: 1
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
        data: action.payload.data,
        totalPage: action.payload.totalPage ?? 1,
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

const useFetch = (
  url,
  defaultParams = {},
  mapData,
  config = { withQueryParams: false, dependencies: undefined },
) => {
  const history = useLocation()
  const queryParams = qs.parse(history.search)
  const [params, setParams] = useState(
    (Object.keys(queryParams).length && config.withQueryParams)
      ? { ...queryParams, ...defaultParams }
      : defaultParams
  )
  const [state, dispatch] = useReducer(reducer, initialState)

  const getParams = useCallback(() => {
    const { page, size, ...query } = params
    const pagination = page ? { page: page - 1, size } : {}
    return { ...query, ...pagination }
  }, [params])

  const pushParamsToHistory = useCallback(() => {
    const { size, ...publicParams } = params
    const filteredParams = Object.entries(publicParams).filter(([, value]) => value !== null)
    history.replace({
      search: `?${qs.stringify(fromEntries(filteredParams))}`
    })
  }, [params, history])

  const fetchData = useCallback(() => {
    dispatch({ type: 'GET_REQUEST' })
    Services().get(url, getParams())
      .then(({ data }) => {
        dispatch({ type: 'GET_REQUEST_SUCCESS', payload: mapData(data) })
        config.withQueryParams && pushParamsToHistory()
      })
      .catch(e => {
        console.error(e)
        dispatch({ type: 'GET_REQUEST_FAILURE', payload: e })
      })
  }, [config.withQueryParams, getParams, url, pushParamsToHistory, mapData])

  const dependenciesIsPassed = useCallback(dependencies => {
    switch (typeof dependencies) {
      case 'string':
        return dependencies === 'resolved'
      case 'object':
        return !dependencies.map(val => val === 'resolved').includes(false)
      default:
        throw new Error(`Invalid dependencies for ${dependencies}`)
    }
  }, [])

  useEffect(() => {
    if (typeof config.dependencies !== 'undefined') {
      dependenciesIsPassed(config.dependencies) && fetchData()
    } else {
      fetchData()
    }
  }, [fetchData, dependenciesIsPassed, config.dependencies])

  return { ...state, params, setParams, refetch: fetchData }
}

export default useFetch