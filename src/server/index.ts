// server/index.ts 文件
import axios, { AxiosRequestConfig, Method } from "axios";
import qs from "qs";
// 请求常量配置
const BASE_URL = import.meta.env.VITE_APP_BASE_URL as string;
const SEUCCESS_CODE = ["200"]; // 多个code可兼容历史api的成功返回值
const SPECIAL_CODE_403 = ['403']; // 添加业务要求的 无权限的code码
const LOGOUT_CODE = ['50002']; // 添加业务要求登出的code码

export type resType = "json" | "blob";

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  withCredentials: true, // 表示跨域请求时是否需要使用凭证
  validateStatus: function (status) {
    return status >= 200 && status <= 304;
  },
  paramsSerializer: function (params) {
    return qs.stringify(params);
  },
});
// 创建一个基本函数，后续的 post & get方法都基于baseFunc
// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 如需自定义config,可在调用api时传入，在此处修改、增加、覆盖
    const options = {
      ...config,
      headers: {
        ...config.headers,
        // 'X-TOKEN': config.headers['X-TOKEN'] || 'default value or test token for testing' // 请求头自定义token, 重置 responseType || Content-Type
      },
    };
    return options;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    const { status, data }: { status: number; data: any } = response;
    // 特殊处理返回类型是 blob 类型的请求
    if (status === 200 && response.config.responseType === "blob") {
      return Promise.resolve(response);
    }
    const { code } = data;
    if (SEUCCESS_CODE.includes(code + "")) {
      // 符合请求成功标准
      return Promise.resolve(data.data || {});
    } else if (SPECIAL_CODE_403.includes(code + "")) {
      // 403需要重新授权
      return Promise.resolve(data);
    } else if (LOGOUT_CODE.includes(code + "")) {
      // 意外登出，重新登录
      // reLogin
      return Promise.reject(data);
      // return Promise.resolve(data)
    } else {
      // 统一弹窗提示错误
      return Promise.reject(data);
    }
  },
  function (error) {
    // 集中处理超时错误
    // 或者 统一向上抛出
    return Promise.reject(error);
  }
);
// 基本配置
// 这里有2种方式可以返回 使用api时配置的返回类型
// 1. 直接在根目录下添加 Axios 的类型声明，改写返回类型
// 2. 引入Axios是点击查看 Axios 定义的类型，在使用 `instance.request` 时改成返回传入泛型即可
// 这里我们使用第二种方式
function request<T>(method: Method, url: string, config: AxiosRequestConfig) {
  return new Promise<T>((resolve, reject) => {
    instance
      .request<T, T>({
        method: method,
        url: url,
        ...config,
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
// 后续根据具体参数类型返回
export function put<T>(url: string, data?: any) {
  return request<T>("PUT", url, { data });
}
export function post<T>(url: string, data?: any, responseType?: resType) {
  return request<T>("POST", url, { data, responseType });
}
export function del<T>(url: string, data?: any) {
  return request<T>("DELETE", url, { data });
}
export function get<T>(url: string, params?: any, responseType?: resType) {
  return request<T>("GET", url, { params, responseType });
}

export default instance;