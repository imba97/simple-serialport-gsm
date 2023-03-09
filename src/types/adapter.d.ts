export default abstract class Adapter {
  abstract handle(options: AdapterHandleOptinos): void
}

/**
 * 处理函数参数
 */
export interface AdapterHandleOptinos {
  /**
   * 发送手机号
   */
  sender?: string

  /**
   * 接收手机号
   */
  receiver: string

  /**
   * 信息内容
   */
  message: string
}
