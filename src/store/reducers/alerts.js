const InitialStateAlerts = {
    alert: {
        status: false,
        componentMessage: '',
        statName: '',
    },
}

export const setAlerts = (state = InitialStateAlerts, action) => {
    switch (action.type) {
        case 'ALERT_ERROR':
            return {
                ...state,
                alert: {
                    status: true,
                    componentMessage:action.payload.message,
                    statName: 'error',
                },
            }
        case 'ALERT_SUCCESS':
            return {
                ...state,
                alert: {
                    status: true,
                    componentMessage: action.payload.message,
                    statName: 'success',
                },
            }
        case 'ALERT_WARNING':
            return {
                ...state,
                alert: {
                    status: true,
                    componentMessage: action.payload.message,
                    statName: 'warning',
                },
            }
        case 'ALERT_ERROR_SESSION':
            //console.log('SESSION : ', action.payload.message)
            return {
                ...state,
                alert: {
                    status: true,
                    componentMessage: action.payload.message,
                    statName: 'error-session',
                },
            }
        case 'ALERT_CLEARS':
            return {
                alert: {
                    status: false,
                    componentMessage: '',
                    statName: 'get-all-clear',
                },
            }
        default:
            return state
    }
}
