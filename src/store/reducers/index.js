import { combineReducers } from 'redux'
import { setAlerts } from './alerts'
import { globalAlert } from './globalAlert'


const rootReducers = combineReducers({
    globalAlert,
    setAlerts,
})

export default rootReducers
