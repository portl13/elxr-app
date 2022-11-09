import { corsMiddleware } from '@middlewares/cors'
import axios from 'axios'
import nc from 'next-connect'
import { onError } from '@middlewares/onErrors'


const handler = nc({ onError })

handler.use(corsMiddleware)

handler.post(async (req, res) => {

})

export default handler