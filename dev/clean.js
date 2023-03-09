const fs = require('fs')

const path = require('path')

function cleanDir(path) {
  const files = fs.readdirSync(path)
  files.forEach((file) => {
    const filePath = `${path}/${file}`
    const stats = fs.statSync(filePath)
    if (stats.isDirectory()) {
      cleanDir(filePath)
      fs.rmdirSync(filePath)
    } else {
      fs.unlinkSync(filePath)
    }
  })
}

cleanDir(path.resolve(__dirname, '../dist'))
