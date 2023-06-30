import { jwtMiddleware } from '@middlewares/jwt'
import nc from 'next-connect'
import { onError } from '@middlewares/onErrors'
import axios from 'axios'

const myAccountApi = process.env.myAccount

export const transferAmount = (token, data) => {
  return axios.post(`${myAccountApi}/wallet/transfer`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

const router = nc({ onError })
router.use(jwtMiddleware)

router.post( async (req, res) => {
  const { user, body } = req
  try {
    const {data} = await transferAmount(user?.token, body)
    return res.status(200).json(data)
  } catch (e) {
    console.log(e)
    return res.status(500).json(e)
  }
})

export default router
