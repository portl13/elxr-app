import { corsMiddleware } from '@middlewares/cors';
import { StreamChat } from 'stream-chat'
import axios from 'axios'
import nc from 'next-connect'
import { jwtMiddleware } from '@middlewares/jwt';
const url = process.env.apiV2

const key = process.env.NEXT_PUBLIC_GETSTREAM_KEY
const secret = process.env.NEXT_PUBLIC_GETSTREAM_SECRET_KEY


function onError(err, req, res, next) {
  res.status(500).json({ message: err.toString()});
  // OR: you may want to continue
  next();
}

const handler = nc({ onError })

handler.use(corsMiddleware)
handler.use(jwtMiddleware)

handler.post(async (req, res) => {
  const { body, user } = req
  try {
    
    const { data } = await axios.post(`${url}/channels`, body, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      }
    })
  
    const serverClient = new StreamChat(key, secret)
  
    const channel = serverClient.channel(
      'gaming',
      `channel-${String(data.channel_id)}`,
      {
        name: body.channel_name,
        created_by_id: String(user.id),
      }
    )
  
    await channel.create()
  
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ message: error.toString() })
  }

})

export default handler
