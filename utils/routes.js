 import {
   faHome,
   faUserPlus,
   faTv,
   faUsers,
   faSignInAlt,
   faSignOutAlt,
   faUserFriends,
   faCog,
   faUserCircle,
   faInbox,
   faWaveSquare,
   faTasks,
   faBook
 } from "@fortawesome/free-solid-svg-icons";
 import {
   faUser,
   faBell
 } from "@fortawesome/free-regular-svg-icons";
 import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const ROUTES = [
  { name: 'Home', path: '/', icon: faHome, isPublic: true, isWeb: true },
  {
    name: 'LiveFeed',
    path: '/livefeed',
    icon: faWaveSquare,
    isPublic: true,
    isWeb: true,
  },
  {
    name: 'Channels',
    path: '/channels',
    icon: faTv,
    isPublic: false,
    isWeb: true,
  },
  {
    name: 'Online Events',
    path: '/online-events',
    icon: '/img/online-events.svg',
    isPublic: true,
    isWeb: true,
  },
  {
    name: 'In-Person Events',
    path: '/in-person-events',
    icon: '/img/location-events.svg',
    isPublic: true,
    isWeb: true,
  },
  {
    name: 'Courses',
    path: '/courses',
    icon: faBook,
    isPublic: true,
    isWeb: true,
  },
  {
    name: 'Messages',
    path: '/messages',
    icon: faInbox,
    isPublic: false,
    isWeb: true,
  },
  { name: 'Connect', path: '/connect', icon: faUserPlus, isPublic: true },
  {
    name: 'Notifications',
    path: '/notifications',
    icon: faBell,
    isPublic: false,
    isWeb: true,
  },
  {
    name: 'Connections',
    path: '/members',
    icon: faUserFriends,
    isPublic: true,
    isWeb: true,
  },
  {
    name: 'Communities',
    path: '/communities-details',
    icon: faUsers,
    isPublic: true,
    isWeb: true,
  },
  {
    name: 'Profile',
    path: '/profile/',
    icon: faUser,
    isPublic: false,
    isWeb: true,
  },
  // {
  //   name: 'Coaching Portal',
  //   path: '/my-portal',
  //   icon: faTasks,
  //   isPublic: false,
  //   isWeb: true,
  // },
  {
    name: 'Settings',
    path: '/account-setting?tab=general',
    icon: faCog,
    isPublic: false,
    isWeb: true,
  },
  { name: 'Logout', path: '/logout', icon: faSignOutAlt, isPublic: false },
  { name: 'Sign In', path: '/login', icon: faSignInAlt, isPublic: false },
  { name: 'Sign Up', path: '/register', icon: faSignOutAlt, isPublic: false },
]
export const getQuery = (querystring) => {
  // parse query string
  const params = new URLSearchParams(querystring)
  const obj = {}
  // iterate over all keys
  for (const key of params.keys()) {
    if (params.getAll(key).length > 1) {
      obj[key] = params.getAll(key)
    } else {
      obj[key] = params.get(key)
    }
  }
  return obj
}
