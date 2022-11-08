import axios from 'axios'

export const getEventByCategory = async (body) => {
  const url = process.env.BASE_API_URL

  const { data } = await axios.post(`${url}/events/search`, body, {
    headers: {
      Authorization:
        'Basic d2ViOjMwNmEyYWMwLTBlNGQtMTFlYi1hZGMxLTAyNDJhYzEyMDAwMg==',
    },
  })

  return data
}

export const getEventById = async (body) => {
  const url = process.env.BASE_API_URL

  const { data } = await axios.post(`${url}/events/byId`, body, {
    headers: {
      Authorization:
        'Basic d2ViOjMwNmEyYWMwLTBlNGQtMTFlYi1hZGMxLTAyNDJhYzEyMDAwMg==',
    },
  })

  return data
}
