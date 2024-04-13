import axios from "axios";
import {getItem,KEY_ACCESS_TOKEN, removeItem} from './localStoreManager'

export const axiosClient = axios.create({
  //now we use these axiousClient to get and post request    baseURL:'http://localhost:4000',
  baseURL: "http://localhost:4000",
  withCredentials: true, //help to get cookies from backend
});

//interseptor use to istersept frientend requesr  and add autorization token and send to backend 
axiosClient.interceptors.request.use(
  (request) => {
    const accessToken=getItem(KEY_ACCESS_TOKEN)
    request.headers['Authorization'] = `Bearer ${accessToken}`

    return request;
 
  }
)

axiosClient.interceptors.response.use(async (respone) => {
    const data=respone.data;
    if(data.status === 'ok' ){
      return data;
    }

    const originalRequest=respone.config;//thsi gives use origional request

    const statusCode=data.statusCode;
    const error =data.error;


    //when refresh token expires user go to login page to login again
    if(statusCode ===401 && originalRequest.url === 'http://localhost:4000/auth/refresh'){
   removeItem(KEY_ACCESS_TOKEN)
   window.location.replace('/login','_self');//go to login page
   return Promise.reject(error);
    }


    //when status conde in 401 not in refresh api in any other api
    //when access token is expired so call refresh token api sliently and regenerate anw access token
    if(statusCode === 401){
      const response =await  axiosClient.get('/auth/refresh');
      console.log("response from backend" ,response)
      // if(response.status === 'ok'){
      //   setItem(KEY_ACCESS_TOKEN ,response.data)
      // }
    }
  },
   
  
)