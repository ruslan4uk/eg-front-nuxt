import { defaults, get } from 'lodash'
export default function({ $axios, store, app, redirect }) {

    $axios.interceptors.response.use(response => {
        const newtoken = get(response, 'headers.authorization')        
        if (newtoken) {
            console.log('NewToken: ', newtoken);
            
            store.$auth.setToken('local', newtoken);
        }
        return response;
    }, error => {
        switch (error.response.status) {
            case 401:
                app.$auth.logout()
                break
            default:
                console.log(error.response)
            }
        return Promise.reject(error)
    });

    $axios.onError(error => {
        if (error.response && error.response.status === 422) {
            store.dispatch('validation/setErrors', error.response.data.errors);
        }
        if (error.response && error.response.status === 401) {
            app.$auth.logout()
        //     // redirect('/auth/login');
        }
        return Promise.reject(error);
    });

    $axios.onRequest(() => {
        store.dispatch('validation/clearErrors');
    });
}