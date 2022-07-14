import { corsMiddleware } from '@middlewares/cors'
import axios from 'axios'
import nc from 'next-connect'
import { jwtMiddleware } from '@middlewares/jwt'
import { onError } from '@middlewares/onErrors'

const url = process.env.woocomApi
const key = process.env.WOO_CK
const secret = process.env.WOO_CS

const handler = nc({ onError })

handler.use(corsMiddleware)
handler.use(jwtMiddleware)

handler.get(async (req, res) => {
  try {
    const { data } = await axios.get(`${url}/products/tags`, {
      params: {
        consumer_key: key,
        consumer_secret: secret,
      }
    })
    return res.status(200).json(data)
  } catch (error) {
    return res.status(500).json({ message: error.toString() })
  }
})

export default handler
