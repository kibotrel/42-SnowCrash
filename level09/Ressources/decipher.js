const { Buffer } = require('buffer')
const fs = require('fs')

try {
  const byteArray = []
  const buffer = Buffer.from(fs.readFileSync(process.argv[2], 'hex'), 'hex')

  for (let i = 0; i < buffer.length - 1; i++) {
    byteArray.push(buffer[i] - i)
  }

  console.log(Buffer.from(byteArray, 'hex').toString())
} catch (_) {
  console.log('You must specify a valid file to decipher.')
}