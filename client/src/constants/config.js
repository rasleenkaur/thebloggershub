// API_NOTIFICATIONS_MESSAGES

export const API_NOTIFICATIONS_MESSAGES = {
    loading: {
        title: 'Loading...',
        message: 'Data is being loaded, Please wait'
    },
    success: {
        title: 'Success',
        message: 'Data is successfully loaded'
    },
    responseFailure: {
        title: 'Error',
        message: 'An error occured while fetching response from the server. Please try again'
    },
    requestFailure:{
        title: 'Error',
        message: 'An error occured ehile parsing request data'
    },
    networkError:{
        title: 'Error',
        message: 'Unable to connect with the server. Please check internet connectivity and try again later'
    }
}


// API SERVICE CALL 
// SAMPLE REQUEST 
// NEED SERVICE CALL : {url: '/', method: 'POST/GET/PUT/DELETE' params : true/false, query: true/false}

export const SERVICE_URLS = {
    userSignup :{ url: '/signup' , method: 'POST'},
    userLogin :{ url: '/login' , method: 'POST'},
    uploadFile: {url: '/file/upload', method: 'POST'},
    createPost: {url: 'create' , method: 'POST'},
    getAllPosts: {url: '/posts', method: 'GET', query: true},
    getPostById: {url: 'post', method : 'GET' , params: true},
    updatePost: {url: 'update', method: 'PUT', params: true},
    deletePost: {url: 'delete', method: 'DELETE', params: true},
    newComment : {url: '/comment/new', method: 'POST'},
    getAllComments: {url: 'comments', method: 'GET', params: true},
    deleteComment: {url: 'comment/delete', method: 'DELETE', params: true}
}