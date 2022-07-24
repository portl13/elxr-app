import Cors from 'cors'

// Initializing the cors middleware
const whitelist = [
  'http://localhost:3000',
  'http://channels.portl.live',
  'http://data.portl.live',
  'https://channels.portl.live',
  'https://data.portl.live',
  'channels.portl.live',
  'data.portl.live',
]
export const corsMiddleware = Cors({
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true)
    } else {
      callback(new Error('It does not have sufficient permits.'))
    }
  },
})
