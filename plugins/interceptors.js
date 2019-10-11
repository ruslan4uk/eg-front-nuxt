export default function({ $axios, store, app, redirect }) {
    $axios.interceptors.request.use((config) => {
        // Do something before request is sent
        //console.log(config.headers.authorization);
        
        return config;
    }, function (error) {
    // Do something with request error
        return Promise.reject(error);
    });
}