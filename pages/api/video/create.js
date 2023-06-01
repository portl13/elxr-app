import { jwtMiddleware } from '@middlewares/jwt'
import nc from 'next-connect'
import { onError } from '@middlewares/onErrors'
import {
  createdTicket
} from '@api/cloudflare/functions'
import { genericFetchPost } from '@request/dashboard'
import axios from 'axios'

const baseUrl = process.env.apiV2
const url = `${baseUrl}/video/`

const router = nc({ onError })
router.use(jwtMiddleware)

router.post(async (req, res) => {
  const { user, body } = req
  const token = user?.token

  try {
    let ticketId = ''
    let data = ''

    if (body.type === 'ticketed') {
      ticketId = await createdTicket(body, user, `On Demand Access for ${body?.title}`)
    }

    const { id } = await genericFetchPost(url, token, body)

    if (body.type === 'ticketed') {
      data = await axios.post(
        `${baseUrl}/utils/update`,
        {
          id: id,
          key: '_ticket_id',
          value: ticketId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
    }

    return res.status(200).json({ id, data: data?.data, ticketId })
  } catch (e) {
    console.log(e)
    return res.status(500).json(e)
  }
})

export default router
