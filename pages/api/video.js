import { corsMiddleware } from '@middlewares/cors'
import { jwtMiddleware } from '@middlewares/jwt'
import axios from 'axios'
import nc from 'next-connect'
import getConfig from 'next/config'
import formidable from 'formidable'
import Ffmpeg from 'fluent-ffmpeg'
import path from 'path'
import FormData from 'form-data'
import fs from 'fs'
import { v4 as uuidv5 } from 'uuid'

const url = process.env.apiV2

function onError(err, req, res, next) {
  return res.status(500).json({ message: err.toString() })
  // OR: you may want to continue
  next()
}

const uploadVideo = async (req) => {
  const { user } = req
  try {
    const formData = new FormData()
    const readStream = fs.createReadStream(req.files.video.filepath)
    
    formData.append('video', readStream)
    const headers = formData.getHeaders()
    const { data } = await axios.post(`${url}/video-upload/`, formData, {
      headers: {
        Authorization: `Bearer ${user.token}`,
        ...headers,
      },
    })
    return { status: true, message: data }
  } catch (error) {
    console.log(error.response.data)
    return { status: false, message: error.toString() }
  }
}

const uploadImage = async (req, path) => {
  const { user } = req
  try {
    const formData = new FormData()
    const fileStream = fs.createReadStream(path)

    formData.append('image', fileStream)
    const headers = formData.getHeaders()
    const { data } = await axios.post(`${process.env.apiURl}/media/`, formData, {
      headers: {
        Authorization: `Bearer ${user.token}`,
        ...headers,
      },
    })
    return { status: true, message: data }
  } catch (error) {
    console.log(error.response)
    return { status: false, message: error.toString() }
  }
}

const pathThumnails = './thumnails'

const handler = nc({ onError })

handler.use(corsMiddleware)
handler.use(jwtMiddleware)
handler.use(async (req, res, next) => {
  const form = new formidable.IncomingForm()
  form.parse(req, async (err, fields, files) => {
    req.fields = fields
    req.files = files
    next()
  })
})

handler.post(async (req, res) => {
  const { serverRuntimeConfig } = getConfig()

  const fileName = `thumnail-${uuidv5()}.png`

  const dir = path.join(
    serverRuntimeConfig.PROJECT_ROOT,
    pathThumnails,
    'videos'
  )

  const pathFile = path.join(dir, fileName)

  Ffmpeg(req.files.video.filepath)
    .on('end', async () => {
      //const { status, message } = await uploadImage(req, pathFile)
      const { status, message } = await uploadVideo(req)
      if (status) {
        fs.unlinkSync(req.files.video.filepath)
        fs.unlinkSync(pathFile)
        return res.json({ message })
      }
      if (!status) {
        fs.unlinkSync(req.files.video.filepath)
        fs.unlinkSync(pathFile)
        return res.status(500).json({ message })
      }
    })
    .on('error', (err) => {
      res.status(500).json({ message: err.toString() })
    })
    .screenshots({
      count: 1,
      folder: dir,
      filename: fileName,
      size: '720x480',
    })

  //   Ffmpeg.ffprobe(req.files.video.filepath, async (err, metadata) => {
  //     if (err) {
  //       return res.status(500).json({ message: err.toString() })
  //     }
  //     return res.json({ metadata: metadata })
  //   })
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default handler
