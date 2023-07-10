import { formatDistanceToNow } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'
import jstz from 'jstz'

export const postedData = (date) => {
  const newDate = new Date(`${date}Z`)
  const timeZone = jstz.determine().name()
  const zonedDate = utcToZonedTime(newDate, timeZone)
  const posted = formatDistanceToNow(zonedDate, { addSuffix: true })
  return posted === 'less than a minute' ? `${posted} ago` : posted
}

export const typeActivity = {
  'new_blog_channel-videos': 'video',
  new_blog_podcasts: 'podcasts',
  new_blog_channel_events: 'event',
  new_blog_blog: 'writing',
  new_blog_album: 'album',
}

export const typeActivityArray = [
  'new_blog_channel-videos',
  'new_blog_podcasts',
  'new_blog_channel_events',
  'new_blog_blog',
  'new_blog_album',
]
