import axios from 'axios';
import store from '../store';
import GlobalAlertActions from '../store/actions/globalAlert';

const Axios = (url = null) => {
    let instance = axios.create();
    if (url) {
        instance.defaults.baseURL = url
    }
    
    instance.interceptors.response.use((response) => {
        return response;
    }, (error) => {
        let code, status, message, title = '';
        if (error.response) {
            code = error.response.status;
            status = error.response.statusText;
            message = (error.response.data.detail) ? error.response.data.detail : (error.response.data.message) ? error.response.data.message : error.response.statusText;
            title = (error.response.data.title) ? error.response.data.title : (error.response.data.message) ? error.response.data.message : error.response.statusText;
        } else {
            code = status = message = title = error.message;
        }
        let errorData = {
            code,
            status,
            message,
            title
        };
        store.dispatch(GlobalAlertActions.requestAlertError(errorData.message)) 
        
        throw (errorData)
    });
    return instance;
}

export const Services = (url = process.env.REACT_APP_API_URL) => ({
    get: (endpointName, params = null, config = null) => {
        let data = {};
        if (params) { data['params'] = params; }
        if (config) { data = { ...data, ...config }; }
        return Axios(url).get(endpointName, data);
    },
    getRequest: (endpointName, params = null, config = null) => {
        return Axios().get(endpointName, params, config)
    },
    post: (endpointName, params = null, config = null) => {
        return Axios(url).post(endpointName, params, config);
    },
    put: (endpointName, params = null, config = null) => {
        return Axios(url).put(endpointName, params, config);
    },
    delete: (endpointName, params = null, config = null) => {
        let data = {};
        if (params) { data['params'] = params; }
        if (config) { data = { ...data, ...config }; }
        return Axios(url).delete(endpointName, data);
    }
})