import { Services } from 'service'
import { getUser } from './user'

/**
 * GET POST BY ID
 * @param {/posts/:id}
 */
export const getPostSuccess = data => ({
    type: 'GET_POST_SUCCESS',
    payload: data,
})

export const getPostFailure = error => ({
    type: 'GET_POST_FAILURE',
    payload: error,
})

export const getPostRequest = id => ({
    type: 'GET_POST_REQUEST',
    payload: id,
})

export const getPost = id => {
    return async dispatch => {
        try {
            dispatch(getPostRequest(id))
            const response = await Services.get(`/posts/${id}`)
            dispatch(getPostSuccess(response.data))
        } catch (error) {
            const { response } = JSON.parse(JSON.stringify(error))
            dispatch(getPostFailure(response ? response.statusText : error.toString()))
        }
    }
}

/**
 * GET POSTS LIST
 * @param {/posts}
 */
export const getPostsSuccess = data => ({
    type: 'GET_POSTS_SUCCESS',
    data,
})

export const getPostsFailure = error => ({
    type: 'GET_POSTS_FAILURE',
    error,
})

export const getPostsRequest = () => ({
    type: 'GET_POSTS_REQUEST',
})

export const getPosts = () => {
    return async dispatch => {
        try {
            dispatch(getPostsRequest())
            const response = await Services.get(`/posts`)
            dispatch(getPostsSuccess(response.data))
        } catch (error) {
            const { response } = JSON.parse(JSON.stringify(error))
            dispatch(getPostsFailure(response ? response.statusText : error.toString()))
        }
    }
}

/**
 * GET POSTS BY USER
 * @param {/posts?userId=:id}
 */
export const getPostsByUserSuccess = data => ({
    type: 'GET_USER_POST_SUCCESS',
    data,
})

export const getPostsByUserFailure = error => ({
    type: 'GET_USER_POST_FAILURE',
    error,
})

export const getPostsByUserRequest = userId => ({
    type: 'GET_USER_POST_REQUEST',
    userId,
})

export const getPostsByUser = userId => {
    return async dispatch => {
        try {
            await dispatch(getPostsByUserRequest(userId))
            const response = await Services.get(`/posts?userId=${userId}`)
            await dispatch(getPostsByUserSuccess(response.data))
        } catch (error) {
            const { response } = JSON.parse(JSON.stringify(error))
            dispatch(getPostsByUserFailure(response ? response.statusText : error.toString()))
        }
    }
}

/**
 * ACTION WITH MULTIPLE REQUEST API
 * @param {*}
 */
export const getUserWithPosts = userId => {
    return async dispatch => {
        try {
            await dispatch(getUser(userId))
            return dispatch(getPostsByUser(userId))
        } catch (error) {
            console.log(error.toString())
        }
    }
}
