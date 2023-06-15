import axios from 'axios'
import nc from 'next-connect'
import { onError } from '@middlewares/onErrors'
const handler = nc({ onError })

const registerUrl = `${process.env.baseUrl}/wp-json/buddyboss-app/auth/v1/register`

handler.post(async (req, res) => {
  const { username, email, password } = req.body
  try {
    await axios.post(registerUrl, {
      username,
      email,
      password,
    })
    return res.status(200).json({ ok: true })
  } catch (e) {
    if (axios.isAxiosError(e) && e.response?.data) {
      return res.status(500).json({ message: e.response?.data?.message })
    }
    return res.status(500).json({ message: e.toString() })
  }
})

export default handler
