import axios, {
  AxiosRequestConfig,
  AxiosInstance,
  AxiosResponse,
  AxiosError
} from 'axios'
import { stringify } from 'qs'
import isFunction from 'lodash/isFunction'
import cloneDeep from 'lodash/cloneDeep'
import { toRaw } from 'vue'
import { MessagePlugin, DialogPlugin } from 'tdesign-vue-next'
// import { useRouter } from 'vue-router'
import router from '../../router'
import { useSettingStore } from '@/store'
import { CreateAxiosOptions } from './AxiosTransform'
import { AxiosCanceler } from './AxiosCancel'
import { AxiosRequestConfigRetry, RequestOptions, Result } from '@/types/axios'
import { getUrlParams, uuid } from '@/utils/index'
import { TOKEN_NAME } from '@/config/global'
// Axios模块
export class VAxios {
  // axios句柄
  private instance: AxiosInstance

  // axios选项
  private readonly options: CreateAxiosOptions

  constructor(options: CreateAxiosOptions) {
    this.options = options
    this.instance = axios.create(options)
    this.setupInterceptors()
  }

  // 创建axios句柄
  private createAxios(config: CreateAxiosOptions): void {
    this.instance = axios.create(config)
  }

  // 获取数据处理
  private getTransform() {
    const { transform } = this.options
    return transform
  }

  // 获取句柄
  getAxios(): AxiosInstance {
    return this.instance
  }

  // 配置 axios
  configAxios(config: CreateAxiosOptions) {
    if (!this.instance) {
      return
    }
    this.createAxios(config)
  }

  // 设置通用头信息
  setHeader(headers: Record<string, string>): void {
    if (!this.instance) {
      return
    }
    Object.assign(this.instance.defaults.headers, headers)
  }

  // 设置拦截器
  private setupInterceptors() {
    const transform = this.getTransform()
    if (!transform) {
      return
    }
    const {
      requestInterceptors,
      requestInterceptorsCatch,
      responseInterceptors,
      responseInterceptorsCatch
    } = transform
    const axiosCanceler = new AxiosCanceler()

    // 请求配置处理
    this.instance.interceptors.request.use((config: any) => {
      // const { headers: any } = config
      // config.headers['Access-Control-Allow-Origin'] = '*'
      // const ignoreRepeat = ignoreRepeatRequest ?? this.options.requestOptions?.ignoreRepeatRequest;
      const ignoreRepeat = ''
      if (!ignoreRepeat) axiosCanceler.addPending(config)

      if (requestInterceptors && isFunction(requestInterceptors)) {
        config = requestInterceptors(config, this.options)
      }

      // get请求参数处理, 解决空格转化为+的Bug
      if (config.method === 'get') {
        let params = '?'
        for (const key in config.params) {
          params += `${key}=${config.params[key]}&`
        }
        params = params.slice(0, -1)
        config.url += params
        config.params = ''
      }
      console.log(config.url)
      // // https://zhyl-admin-t.itheima.net
      // const baseUrl = 'https://zhyl-admin.itheima.net'
      // if (
      //   config.url === `${baseUrl}/api/visit` ||
      //   config.url === `${baseUrl}/api/checkIn/create` ||
      //   config.url === `${baseUrl}/api/checkIn/review` ||
      //   config.url === `${baseUrl}/api/checkIn/sign` ||
      //   config.url === `${baseUrl}/api/user` ||
      //   (config.url === `${baseUrl}/api/checkIn` && config.method === 'post') ||
      //   config.url === `${baseUrl}/api/elder/create` ||
      //   config.url === `${baseUrl}/api/elder/submit` ||
      //   config.url === `${baseUrl}/api/iot/UpdateDevice` ||
      //   config.url === `${baseUrl}/api/resource/enable` ||
      //   config.url === `${baseUrl}/api/bill/payRecord` ||
      //   config.url === `${baseUrl}/api/bill/prepaidRechargeRecord` ||
      //   config.method === 'delete' ||
      //   config.method === 'patch' ||
      //   config.method === 'put'
      // ) {
      //   MessagePlugin.warning({
      //     closeBtn: true,
      //     content: '演示系统，不支持此操作'
      //   })
      //   return false
      // }
      return config
    }, undefined)

    // 请求错误处理
    if (requestInterceptorsCatch && isFunction(requestInterceptorsCatch)) {
      this.instance.interceptors.request.use(
        undefined,
        requestInterceptorsCatch
      )
    }

    // 响应结果处理
    this.instance.interceptors.response.use((res: AxiosResponse) => {
      if (res) axiosCanceler.removePending(res.config)
      if (responseInterceptors && isFunction(responseInterceptors)) {
        res = responseInterceptors(res)
      }
      return res
    }, undefined)

    // 响应错误处理
    if (responseInterceptorsCatch && isFunction(responseInterceptorsCatch)) {
      this.instance.interceptors.response.use(
        undefined,
        responseInterceptorsCatch
      )
    }
  }

  // 支持Form Data
  supportFormData(config: AxiosRequestConfig) {
    const headers = config.headers || this.options.headers
    const contentType = headers?.['Content-Type'] || headers?.['content-type']

    if (
      contentType !== 'application/x-www-form-urlencoded;charset=UTF-8' ||
      !Reflect.has(config, 'data') ||
      config.method?.toUpperCase() === 'GET'
    ) {
      return config
    }

    return {
      ...config,
      data: stringify(config.data, { arrayFormat: 'brackets' })
    }
  }

  get<T = any>(
    config: AxiosRequestConfig,
    options?: RequestOptions
  ): Promise<T> {
    return this.request({ ...config, method: 'GET' }, options)
  }

  post<T = any>(
    config: AxiosRequestConfig,
    options?: RequestOptions
  ): Promise<T> {
    return this.request({ ...config, method: 'POST' }, options)
  }

  put<T = any>(
    config: AxiosRequestConfig,
    options?: RequestOptions
  ): Promise<T> {
    return this.request({ ...config, method: 'PUT' }, options)
  }

  delete<T = any>(
    config: AxiosRequestConfig,
    options?: RequestOptions
  ): Promise<T> {
    return this.request({ ...config, method: 'DELETE' }, options)
  }

  patch<T = any>(
    config: AxiosRequestConfig,
    options?: RequestOptions
  ): Promise<T> {
    return this.request({ ...config, method: 'PATCH' }, options)
  }

  // 请求
  async request<T = any>(
    config: AxiosRequestConfigRetry,
    options?: RequestOptions
  ): Promise<T> {
    // 放在最上面初始化会报错Cannot access 'useSettingStore' before initialization
    const settingStore = useSettingStore()
    const url = this.options.requestOptions.urlPrefix
      ? window.location.origin +
        this.options.requestOptions.urlPrefix +
        config.url
      : window.location.origin + config.url
    // console.log(this.options, config, config.url.indexOf('?'), '----')
    // 组装所需接口数据
    settingStore.addRequestList({
      uuid: uuid(8, 16),
      url,
      type: config.method,
      headers: this.options.headers,
      body: config.data ? { ...toRaw(config.data) } : {},
      params: getUrlParams(url),
      label:
        config.url.indexOf('?') !== -1 ? config.url.split('?')[0] : config.url
    })
    // 处理掉参数中出现undefined的选项
    config.params = config.params
      ? JSON.parse(JSON.stringify(config.params))
      : config.params
    let conf: CreateAxiosOptions = cloneDeep(config)
    const transform = this.getTransform()

    const { requestOptions } = this.options

    const opt: RequestOptions = { ...requestOptions, ...options }

    const { beforeRequestHook, requestCatchHook, transformRequestHook } =
      transform || {}
    if (beforeRequestHook && isFunction(beforeRequestHook)) {
      conf = beforeRequestHook(conf, opt)
    }
    conf.requestOptions = opt

    conf = this.supportFormData(conf)
    return new Promise((resolve, reject) => {
      this.instance
        .request<any, AxiosResponse<Result>>(!config.retryCount ? conf : config)
        .then((res: AxiosResponse<Result>) => {
          if (transformRequestHook && isFunction(transformRequestHook)) {
            // 将对应接口的返回信息拼装到接口队列中
            settingStore.requestList.forEach((item, index) => {
              if (
                item.type.toLowerCase() === res.config.method &&
                res.request.responseURL.includes(item.url)
              ) {
                settingStore.addRequestListRes(index, res.data)
              }
            })
            try {
              const { data, status }: any = res
              // console.log(data, status)
              if (status === 401) {
                localStorage.removeItem(TOKEN_NAME)
                const confirmDialog = DialogPlugin.confirm({
                  header: '登录异常提示',
                  body: '登录超时，请重新登录',
                  cancelBtn: null,
                  closeBtn: false, // 是否显示取消按钮
                  closeOnOverlayClick: false, // 是否可通过点击遮罩层关闭
                  closeOnEscKeydown: false, // 是否可通过按下 ESC 键关闭
                  confirmBtn: {
                    content: '重新登录',
                    theme: 'primary',
                    loading: false
                  },
                  theme: 'warning',
                  onConfirm: () => {
                    console.log(123135)
                    router.push('/login')
                    // confirmDialog.update({
                    //   confirmBtn: { content: '提交中', loading: true }
                    // })
                    // // confirmDialog.update({ confirmLoading: true });
                    // // confirmDialog.setConfirmLoading(true);
                    const timer = setTimeout(() => {
                      // confirmDialog.update({ confirmLoading: false });
                      // confirmDialog.setConfirmLoading(false);
                      confirmDialog.hide()
                      clearTimeout(timer)
                    }, 50)
                  }
                })
              } else if (status === 403) {
                MessagePlugin.error('权限不足，请联系管理员')
              }
              if (data.code && data.code !== 200) {
                MessagePlugin.error(data.msg)
              }
              resolve(data)
            } catch (err) {
              reject(err || new Error('请求错误!'))
            }
            return
          }

          resolve(res as unknown as Promise<T>)
        })
        .catch((e: Error | AxiosError) => {
          if (requestCatchHook && isFunction(requestCatchHook)) {
            reject(requestCatchHook(e, opt))
            return
          }
          if (axios.isAxiosError(e)) {
            // 在这里重写Axios的错误信息
            // console.log(e, 'eeee')
          }
          reject(e)
        })
    })
  }
}
