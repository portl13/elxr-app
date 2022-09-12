import { corsMiddleware } from '@middlewares/cors'
import { jwtMiddleware } from '@middlewares/jwt'
import { onError } from '@middlewares/onErrors'
import axios from 'axios'
import nc from 'next-connect'
const mediaUrl = `${process.env.baseUrl}/wp-json/wp/v2/media`

const handler = nc({ onError: onError })

//handler.use(corsMiddleware)
handler.use(jwtMiddleware)

handler.get(async (req, res) => {
  const data = await axios.get(mediaUrl, {
    params: {
      per_page: 16,
      page: req?.query?.page || 1 ,
      author: req.user.id,
      media_type: req?.query.media_type || 'image',
    },
    headers: {
      Authorization: `Bearer ${req.user.token}`,
    },
  })
  return res.json(data.data)
})

export default handler
