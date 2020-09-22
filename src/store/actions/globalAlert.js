const requestAlertSuccess = message => ({
    type: 'SET_GLOBAL_ALERT_SUCCESS',
    payload: { message },
})
const requestAlertWarning = message => ({
    type: 'SET_GLOBAL_ALERT_WARNING',
    payload: { message },
})
const requestAlertError = message => ({
    type: 'SET_GLOBAL_ALERT_ERROR',
    payload: { message },
})
const requestAlertShow = (message, type) => ({
    type: 'SET_GLOBAL_ALERT_SHOW',
    payload: { message, type },
})
const requestAlertClear = () => ({
    type: 'SET_GLOBAL_ALERT_CLEAR',
})
const GlobalAlertActions = {
    requestAlertSuccess,
    requestAlertWarning,
    requestAlertError,
    requestAlertShow,
    requestAlertClear,
}
export default GlobalAlertActions
