import axios from "axios"
import nc from "next-connect"
import { onError } from "@middlewares/onErrors"
const handler = nc({ onError })

const registerUrl = `${process.env.baseUrl}/wp-json/buddyboss-app/auth/v1/register`
const endpoint = "https://challenges.cloudflare.com/turnstile/v0/siteverify"
const secret = process.env.TurnstileSecretKey

handler.post(async (req, res) => {
  const { username, email, password } = req.body
  try {
    const { data } = await axios.post(registerUrl, {
      username,
      email,
      password,
    })
    return res.status(200).json(data)
  } catch (e) {
    if (axios.isAxiosError(e) && e.response?.data) {
      return res.status(500).json({ message: e.response?.data?.message })
    }
    return res.status(500).json({ message: e.toString() })
  }
})

export default handler
