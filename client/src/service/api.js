import axios from "axios";
import { API_NOTIFICATIONS_MESSAGES, SERVICE_URLS } from "../constants/config.js";
import { getAccessToken, getType } from "../utils/common-utils.js";

const API_URL = '';

const axiosInstance=axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers:{
        "content-type": "application/json"
    }
})

axiosInstance.interceptors.request.use(
    function(config){
        if(config.TYPE.params){
            config.params=config.TYPE.params;
        }
        else if( config.TYPE.query){
            config.url = config.url + '/' + config.TYPE.query;
        }
        return config;
    },
    function(error){
        return Promise.reject(error);
    }
)

axiosInstance.interceptors.response.use(
    function(response){
        // Stop global loader here
        return processResponse(response);
    },
    function (error){
        // Stop global loader here
        return Promise.reject(processError(error));
    }
)
// /////////////////////////////////////////////////
// If success -> return { isSucess: true, data: Object}
//  If fail -> return {isFailure: true, status : string, code: int }
const processResponse=(response)=>{
    if(response?.status === 200){
        return { isSuccess: true, data: response.data }
    }
    else{
        return{
            isFailure: true,
            status: response?.status,
            msg: response?.msg,
            code: response?.code
        }
    }
}

// /////////////////////////////////////////////////
// If success -> return { isSucess: true, data: Object}
//  If fail -> return {isFailure: true, status : string, code: int }
const processError=(error)=>{
    if(error.response){
        // Request made and server responded with a status other 
        // that falls out of range 2.X.X
        console.log('Error in RESPONSE :', error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATIONS_MESSAGES.responseFailure,
            code: error.response.status
        }
        }
    else if(error.request){
        //Request made but no response was received 
        console.log('Error in REQUEST :', error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATIONS_MESSAGES.requestFailure,
            code: ""
        }

    }
    else{
        // SOmething happened in setting up request that triggers an error
        console.log('Error in NETWORK :', error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATIONS_MESSAGES.networkFailure,
            code: ""
        }
    }
}

const API = {};

// for(const [key,value] of Object.entries(SERVICE_URLS)){
//     API[key] = (body, showUploadProgress, showDownloadProgress)=>
//         axiosInstance({
//             method: value.method,
//             url: value.url,
//             data:body,
//             responseType:value.responseType,
//             onUploadProgress: function(progressEvent){
//                 if(showUploadProgress){
//                     let percentageCompleted = Math.round((progressEvent.loaded*100)/progressEvent.total)
//                     showDownloadProgress(percentageCompleted);
//                 }
//             },
//             onDownloadProgress: function(progressEvent){
//                 if(showDownloadProgress){
//                     let percentageCompleted = Math.round((progressEvent.loaded*100)/progressEvent.total)
//                     showDownloadProgress(percentageCompleted);
//                 }
//             }
//         })
//     }

for (const [key, value] of Object.entries(SERVICE_URLS)) {
    API[key] = (body, showUploadProgress, showDownloadProgress) =>
      axiosInstance({
        method: value.method,
        url: value.url,
        data: value.method === 'DELETE' ? {}: body, 
        responseType: value.responseType,
       headers:{
        authorization: getAccessToken()
       },
       TYPE: getType(value,body),
        onUploadProgress: function (progressEvent) {
          if (showUploadProgress) {
            let percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            showUploadProgress(percentCompleted);
          }
        },
        onDownloadProgress: function (progressEvent) {
          if (showDownloadProgress) {
            let percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            showDownloadProgress(percentCompleted);
          }
        },
      });
  }

    export { API };
