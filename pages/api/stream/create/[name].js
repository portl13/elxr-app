import axios from 'axios'

const url_portl = process.env.baseUrl + '/wp-json/portl/v1/stream/'
const token_portl = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvZGF0YS5wb3J0bC5saXZlIiwiaWF0IjoxNjQyMTM5NDMwLCJuYmYiOjE2NDIxMzk0MzAsImV4cCI6MTY0Mjc0NDIzMCwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoxOSwiZGV2aWNlIjoiIiwicGFzcyI6ImFiODYzNzYwM2NkODRmOWUxZjgwOWQxYmNmOTdmNjBjIn19fQ.ILJnXANAxrAgyrrawGVhOjod6XKSiJjjPN0vDeU8Myc';

export default async (req, res) => {
  const { body } = req
  const url = process.env.LIVEPEER_API_URL
  const token = process.env.LIVEPEER_API_TOKEN
  const { channelID, name } = body

  try {
    const { data } = await axios.post(
      `${url}/stream/`,
      {
        name: req.query.name,
        profiles: [
          {
            name: '720p',
            bitrate: 2000000,
            fps: 30,
            width: 1280,
            height: 720,
          },
          {
            name: '480p',
            bitrate: 1000000,
            fps: 30,
            width: 854,
            height: 480,
          },
          {
            name: '360p',
            bitrate: 500000,
            fps: 30,
            width: 640,
            height: 360,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    const resp = await axios.post(
      `${url_portl}`,
      {
        channel_id: channelID,
        stream_data: data,
      },
      {
        headers: {
          Authorization: `Bearer ${token_portl}`,
        },
      }
    )


    return res.json(resp.data)
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
}
