const initialState = {
    message: '',
    type: '',
}
export const globalAlert = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_GLOBAL_ALERT_SUCCESS':
            return {
                message: action.payload.message,
                type: 'success',
            }
        case 'SET_GLOBAL_ALERT_WARNING':
            return {
                message: action.payload.message,
                type: 'warning',
            }
        case 'SET_GLOBAL_ALERT_ERROR':
            return {
                message: action.payload.message,
                type: 'error',
            }
        case 'SET_GLOBAL_ALERT_SHOW':
            return {
                message: action.payload.message,
                type: action.payload.type,
            }
        case 'SET_GLOBAL_ALERT_CLEAR':
            return {
                message: '',
                type: '',
            }
        default:
            return state
    }
}
