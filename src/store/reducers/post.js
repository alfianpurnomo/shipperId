/**
 * Redux Post
 */
const postInitialState = {
    postList: [],
    pickedPost: null,
    pickedPostId: '',
    isProcessing: true,
    error: '',
}

const post = (state = postInitialState, action) => {
    switch (action.type) {
        case 'GET_POST_REQUEST':
            return {
                ...state,
                pickedPostId: action.payload,
                isProcessing: true,
            }
        case 'GET_POST_SUCCESS':
            return {
                ...state,
                pickedPost: action.payload,
                isProcessing: false,
            }
        case 'GET_POST_FAILURE':
            return {
                ...state,
                error: action.payload,
                isProcessing: false,
            }
        case 'GET_POSTS_REQUEST':
            return {
                ...state,
                isProcessing: true,
            }
        case 'GET_POSTS_SUCCESS':
            return {
                ...state,
                postList: action.data,
                isProcessing: false,
            }
        case 'GET_POSTS_FAILURE':
            return {
                ...state,
                error: action.error,
                isProcessing: false,
            }
        default:
            return state
    }
}

/**
 * Redux User Post
 */
const userPostInitialState = {
    userPostList: [],
    pickedUserId: '',
    isProcessing: true,
    error: '',
}

const userPost = (state = userPostInitialState, action) => {
    switch (action.type) {
        case 'GET_USER_POST_REQUEST':
            return {
                ...state,
                pickedUserId: action.userId,
                isProcessing: true,
            }
        case 'GET_USER_POST_SUCCESS':
            return {
                ...state,
                userPostList: action.data,
                isProcessing: false,
            }
        case 'GET_USER_POST_FAILURE':
            return {
                ...state,
                error: action.error,
                isProcessing: false,
            }
        default:
            return state
    }
}

/**
 * Export Redux
 */
export { post, userPost }
