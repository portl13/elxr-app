import {
  faUserFriends,
  faEnvelope,
  faUserTimes,
  faLock,
  faTrash,
  faCloudDownloadAlt,
  faCog,
  faAmbulance,
  faUsers,
  faShoppingBag,
  faThumbsUp,
  faUser,
  faLocationArrow,
  faCreditCard,
  faCalendarDay,
  faGraduationCap,
  faWifi,
  faLayerGroup
} from '@fortawesome/free-solid-svg-icons'
import { stringToSlug } from '@lib/stringToSlug'

export const NOT_FRIEND = 'not_friends'
export const PENDING = 'pending'
export const GROUP_INVITE_STATUS = 'group-invite-status'
export const GROUP_ACTIVITY_STATUS = 'group-activity-feed-status'
export const GROUP_MEDIA_STATUS = 'group-media-status'
export const GROUP_ALBUM_STATUS = 'group-album-status'
export const MEMBERS = 'members'
export const MODS = 'mods'
export const ADMINS = 'admins'
export const IS_FRIEND = 'is_friend'
export const TOTAL = 'x-wp-total'
export const MEMBER_DEL_ERR =
  'Those users are already friends or have sent friendship request(s) recently.'
export const AWAITING = 'awaiting_response'
export const imageUrl =
  'https://data.portl.live/wp-content/plugins/buddyboss-platform/bp-core/images/mystery-group.png'

export const PortlClientId =
  'AXkW4gUT77B4OBkhBFGMnLzngE_MzuL0c0bmvZ4nRPFpvwa-F-zTh1Tmb46Y0VuNYRpA_OcTCfxoQZXy'

export const TIMEOUT = {
  timeout: 3000,
}

export const PERPAGE = 9999

export const TAB_NAME = [
  { name: 'All Members', value: 'all' },
  { name: 'My Connections', value: 'personal' },
  { name: 'Following', value: 'following' },
]

export const PROFILE_TAB_NAME = {
  personal: 'just-me',
  likes: 'favorites',
  connections: 'friends',
  groups: 'groups',
  mentions: 'mentions',
  following: 'following',
}

export const INNER_NAV_NAME = [
  { name: 'Timeline', value: 'timeline', route: 'personal' },
  { name: 'Profile', value: 'profile' },
  { name: 'Connections', value: 'connections', route: 'connection' },
  { name: 'Community', value: 'community', route: 'group' },
  // { name: "My Events", value: "myevents" },
  { name: 'Photos', value: 'photos', route: 'photos' },
  { name: 'Courses', value: 'courses', route: 'courses' },
]

export const GROUP_NAV_NAME = [
  { name: 'Feeds', value: 'feeds' },
  { name: 'Meet', value: 'meet' },
  { name: 'Members', value: 'members' },
  { name: 'Discussions', value: 'discusion' },
  { name: 'Albums', value: 'albums' },
  { name: 'Photos', value: 'photos' },
  { name: 'Send Invites', value: 'invites' },
  { name: 'Manage', value: 'manage', route: 'details' },
]

export const MEMBER_ROLE = {
  Organizer: "You're an Organizer",
}

export const GROUP_SUB_NAV = [
  { name: 'Send Invites', value: 'send-invites' },
  { name: 'Pending Invites', value: 'pending-invites' },
]

export const GROUP_MANAGE_NAV = [
  { name: 'Details', value: 'details' },
  { name: 'Setting', value: 'setting' },
  { name: 'Photo', value: 'photos' },
  { name: 'Cover Photo', value: 'cover-photo' },
  { name: 'Members', value: 'member' },
  { name: 'Forum', value: 'forum' },
  // { name: "Requests", value: "request" },
  { name: 'Meet', value: 'meet' },
  { name: 'Delete', value: 'delete' },
]

export const GROUP_MEMBER_ROLE = {
  Moderator: `When a group member is promoted to be a moderator of the group,
    the member gains the ability to edit and delete any forum discussion
    within the group and delete any activity feed items, excluding those
    posted by organizers.`,
  Member: `When a member joins a group, he or she is assigned the member role by default.
     Members are able to contribute to the group’s discussions, activity feeds, and view other group members.`,
}

export const ROLES_GROUP = ['Moderator', 'Member']
export const ROLES_GROUP_MEM = ['Organizer', 'Member']

export const removeSpecailChar = (text) => {
  return text && text.replace(/[^a-z\d\s]+/gi, '')
}

export const getProfileChannelRoute = (name, id, keyName, tabName, albumId) => {
  const tabVal = tabName ? `&tab=${tabName}` : ''
  const idVal = albumId ? `&albumId=${albumId}` : ''
  return `/channel/${stringToSlug(name)}/${id}?key=${keyName}${tabVal}${idVal}`
}

export const getProfileRoute = (name, id, keyName, tabName, albumId) => {
  if (!name) return ''
  const tabVal = tabName ? `&tab=${tabName}` : ''
  const idVal = albumId ? `&albumId=${albumId}` : ''
  return `/profile/${stringToSlug(name)}/${id}?key=${keyName}${tabVal}${idVal}`
}

export const getProfileFeedRouter = (username, id) => {
  return `/${stringToSlug(username)}/${id}?key=timeline&tab=personal`
}

export const FRND_TEXT = {
  [NOT_FRIEND]: 'Connect',
  [IS_FRIEND]: 'Connected',
  [AWAITING]: 'Connect requested',
  [PENDING]: 'Cancel connection request',
}

export const MSG_SUCCESS = {
  unread: 'Messages marked unread successfully.',
  hide_thread: 'Messages hidden successfully.',
  delete_messages: 'Messages deleted successfully.',
}

export const LIVEFEED_NAV = [
  { name: 'All Updates', value: '' },
  { name: 'Likes', value: 'favorites' },
  { name: 'Connections', value: 'friends' },
  { name: 'Communities', value: 'groups' },
  { name: 'Mentions', value: 'mentions' },
  { name: 'Following', value: 'following' },
]

export const getRoleName = (name) => {
  return name === 'Organizer' ? `an ${name}` : `a ${name}`
}

export const NAV_ICON = {
  general: faUserFriends,
  notifications: faEnvelope,
  'blocked-members': faUserTimes,
  profile: faLock,
  invites: faCog,
  export: faCloudDownloadAlt,
  'delete-account': faTrash,
  address: faLocationArrow,
  'payment-method': faCreditCard,
  'account-details': faCog
}

export const CHANEL_SUB_NAV = [
  { name: 'Branding', value: 'store', icon: faShoppingBag },
  //{ name: 'Payment', value: 'payment', icon: faMoneyBill },
  { name: 'Policy', value: 'store-policies', icon: faAmbulance },
  { name: 'Support', value: 'customer-support', icon: faThumbsUp },
]

export const STORE_SUB_NAV = [
  { 
    name: 'Subscription', 
    value: 'edit-subscription', 
    icon: faCog 
  },
  { 
    name: 'Products', 
    value: 'product', 
    icon: faShoppingBag,
    id: 'any'
  },
  { 
    name: 'Courses', 
    value: 'courses', 
    icon: faGraduationCap 
  },
  { 
    name: 'Subscribers', 
    value: 'subscriber', 
    icon: faWifi ,
    id: 'all'
  },
  { 
    name: 'Orders', 
    value: 'order', 
    icon: faLayerGroup,
    id: 'all'
  },
  { 
    name: 'Customers', 
    value: 'customer', 
    icon: faUserFriends 
  },
]

export const SOCIAL_SUB_NAV = [
  { name: 'Personal', value: 'personal', icon: faUser },
  { name: 'Social', value: 'setting', icon: faUsers },
]

export const LIVE_SUB_NAV = [
  { name: 'Stream', value: 'stream', icon: faShoppingBag },
  { name: 'Events', value: 'events', icon: faAmbulance },
]

export const WALLET_SUB_NAV = [
  { name: 'My Wallet', value: 'transactions' },
  { name: 'Wallet topup', value: 'topup' },
  { name: 'Wallet transfer', value: 'transfer' },
  { name: 'Transactions', value: 'wallet-transaction' },
  { name: 'Withdrawal', value: 'withdraw' },
]
export const SCHELUDE_SUB_NAV = [
  { name: 'Meetings', value: 'meetings', icon: faUsers },
  { name: 'Calendar', value: 'calendar', icon: faCalendarDay },
]

export const validateYouTubeUrl = (url) => {
  if (url != undefined || url != '') {
    let regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/
    return url.match(regExp)
  }
  return false
}

export const validateVimeoURL = (url) => {
  if (url != undefined || url != '')
    return /^(http\:\/\/|https\:\/\/)?(www\.)?(vimeo\.com\/)([0-9]+)$/.test(url)
  return false
}

export const PROD_TYPE = [
  { slug: 'simple', name: 'Simple Product' },
  { slug: 'subscription', name: 'Simple Subscription' },
]

export const FREE_TRAIL = [
  { value: 'day', name: 'day' },
  { value: 'week', name: 'week' },
  { value: 'month', name: 'month' },
  { value: 'year', name: 'year' },
]

export const MONTH = [
  { value: 1, name: 'every' },
  { value: 2, name: 'every 2nd' },
  { value: 3, name: 'every 3rd' },
  { value: 4, name: 'every 4th' },
  { value: 5, name: 'every 5th' },
  { value: 6, name: 'every 6th' },
]

export const generateRandomString = () => {
  let randomString = ''
  let characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < 10; i++) {
    randomString += characters.charAt(
      Math.floor(Math.random() * characters.length)
    )
  }
  return randomString
}

export const PERIOD = { day: 91, week: 52, month: 25, year: 6 }

export const PAY_METHOD = [
  { value: null, name: 'Choose withdrawal payment method' },
  { value: 'paypal', name: 'Paypal' },
  { value: 'bank_transfer', name: 'Bank Transfer' },
  { value: 'stripe', name: 'Stripe' },
]

export const PRIVACY = [
  {
    name: 'Private',
    value: 'private',
    description: 'Only you and people you choose can watch your stream',
  },
  {
    name: 'Unlisted',
    value: 'unlisted',
    description: 'Anyone with the stream link can watch your stream',
  },
  {
    name: 'Public',
    value: 'public',
    description: 'Everyone can watch your stream',
  },
]

export const STREAM_METHOD = [
  {
    name: 'Webcam',
    value: 'webcam',
    description: 'Stream directly from your web browser',
  },
  {
    name: 'Software Stream',
    value: 'rtmp',
    description: 'Stream using 3rd party software such as OBS',
  },
]

export const EVENT_PARTICIPANTS = [
  {
    label: 'anyone',
    value: 'anyone',
  },
  {
    label: 'subscribers',
    value: 'subscribers',
  },
]
