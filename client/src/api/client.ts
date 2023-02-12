import axios, {
  AxiosInstance,
  AxiosInterceptorManager,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { getCookie } from "cookies-next";

interface CustomInstance extends AxiosInstance {
  interceptors: {
    request: AxiosInterceptorManager<InternalAxiosRequestConfig>;
    response: AxiosInterceptorManager<AxiosResponse>;
  };
}

export interface TErrorRespnose {
  statusCode: number;
  message: string;
  error: any;
}

// 인스턴스를 생성할때 config 기본값 설정하기
const client: CustomInstance = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 5000,
});

client.interceptors.request.use(
  function (config) {
    if (getCookie("accessToken")) {
      config.headers.Authorization = `Bearer ${getCookie("accessToken")}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 추가하기
client.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error.response.data);
  }
);

export default client;
