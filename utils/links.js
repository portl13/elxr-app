import { stringToSlug } from '@lib/stringToSlug'

export const profileLink = (name, id) => {
  if (!name || !id) return '/'
  return `/profile/${stringToSlug(name)}/${id}`
}

export const writingsLink = (name, id) => {
  if (!name || !id) return '/'
  return `/writing/${stringToSlug(name)}/${id}`
}

export const professionalsLink = (name, id) => {
  if (!id) return '/'
  return `/professionals/${name ? stringToSlug(name) : 'member'}/${id}`
}
