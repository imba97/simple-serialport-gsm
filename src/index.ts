import PhoneHandle from './adapters/MainlandChinaAdapter'

import { SerialPort } from 'serialport'

// SerialPort.list().then((res) => {
//   console.log(res);
// });

const port = new SerialPort({
  path: 'COM7',
  baudRate: 115200,
  dataBits: 8,
  stopBits: 1,
  parity: 'none'
})

port.on('open', async () => {
  console.log('opened')

  port.on('data', (data) => {
    console.log(data.toString())
  })

  port.on('error', (err) => {
    console.log('err', err)
  })

  port.write('AT+CMGF=0\r')
  await delay(500)
  port.write('AT+CSCS="GSM"\r')
  await delay(500)
  port.write('AT+CMGS=18\r')
  await delay(500)
  port.write('0891685186028090F711000D91687125712198F70008AA4f60597d')
  await delay(500)
  port.write(Buffer.from([0x1a]))
  port.write('\r')
})

function delay(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}
