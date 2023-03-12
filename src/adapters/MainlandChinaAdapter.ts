import Adapter, { AdapterHandleOptinos } from '@/types/adapter'

/**
 * 中国大陆地区
 */
export class MainlandChinaAdapter extends Adapter {
  public handle(options: AdapterHandleOptinos) {
    // 发送人手机号
    const sender = '089168' + this.reverse(`${options.sender}F`)
    // 接收人手机号
    const receiver = '68' + this.reverse(`${options.receiver}F`)
    const messageUnicode = this.message2Unicode(options.message)
    const CMGSLengthString = `11000D91${receiver}0008AA${messageUnicode}`
    const CMGSLength = CMGSLengthString.length / 2
    return {
      CMGSLength,
      message: sender + CMGSLengthString
    }
  }

  private reverse(phone: string) {
    const phoneReverse: string[] = []

    phone.split('').forEach((char, index) => {
      if (index % 2 === 0) {
        phoneReverse.push(phone[index + 1], char)
      }
    })

    return phoneReverse.join('')
  }

  private message2Unicode(str: string) {
    const message = [...str]
      .map((str) => this.padStart(str.charCodeAt(0).toString(16)))
      .join('')

    const len = (message.length / 2).toString(16)

    const pre = `${len}`.length === 1 ? `0${len}` : len

    return `${pre.toUpperCase()}${message}`
  }

  /**
   * 不足 4 位时前面补 0
   * @param str
   * @returns 补齐后的 unicode
   */
  private padStart(str: string): string {
    if (str.length === 4) {
      return str
    }

    let prefix = ''
    for (let i = 0; i < 4 - str.length; i++) {
      prefix += '0'
    }

    return `${prefix}${str}`
  }
}
