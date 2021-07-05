import { extname } from 'path'
import { createReadStream } from 'fs'
import { createHash } from 'crypto'

// 编辑文件名称
export const editFileName = (req, file, callback) => {
  const fileExtName = extname(file.originalname)
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('')
  callback(null, `${new Date().getTime()}-${randomName}${fileExtName}`)
}

// 获取文件md5
export function getFileMd5(filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const stream = createReadStream(filePath)
    const hash = createHash('md5')
    stream.on('data', (chunk: string) => {
      hash.update(chunk, 'utf8')
    })
    stream.on('end', () => {
      const md5 = hash.digest('hex')
      resolve(md5)
    })
    stream.on('error', (e) => {
      reject(e)
    })
  })
}

// 获取文件buffer
export function getFileBuffer(filePath: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const rs = createReadStream(filePath)
    const arr = []
    rs.on('data', (chunk: Buffer) => {
      arr.push(chunk)
    })
    rs.on('end', () => {
      resolve(Buffer.concat(arr))
    })
    rs.on('error', (e) => {
      reject(e)
    })
  })
}

// 获取文件sha1
export function getFileSHA(filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const stream = createReadStream(filePath)
    const hash = createHash('sha1')
    stream.on('data', (chunk: string) => {
      hash.update(chunk, 'utf8')
    })
    stream.on('end', () => {
      const md5 = hash.digest('hex')
      resolve(md5)
    })
    stream.on('error', (e) => {
      reject(e)
    })
  })
}
