import axios from "axios"

const baseApi = process.env.bossApi

export const getmemberDetails = (user, data) =>
  axios.get(baseApi + "/members", {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
    params: data,
  })

export const connectionRequest = (user, data) =>
  axios(baseApi + "/friends", {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
    params: data,
  })

export const deleteFriendship = (user, id) =>
  axios.delete(`${baseApi}/friends/${id}`, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  })

export const getPhotos = (user, data) =>
  axios.get(`${baseApi}/media`, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
    params: data,
  })

export const deleteConfirmFriendship = (user, data) =>
  axios.delete(`${baseApi}/friends`, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
    data,
  })

export const createFriendship = (user, data) =>
  axios.post(`${baseApi}/friends`, data, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  })

export const followMember = (user, data) =>
  axios.post(`${baseApi}/members/action/${data.user_id}`, data, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  })

export const inviteMember = (user, memberId, data) =>
  axios.post(
    `${baseApi}/groups/invites${memberId.length ? "/multiple" : ""}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    }
  )

export const getUrlDetails = (user, url) =>
  axios.get(url, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  })
export const memberDetails = (user, id) => {
  console.log({ id })
  axios.get(`${baseApi}/members/${id}`, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  })
}

export const getblockMemberList = (user, data) =>
  axios.get(baseApi + `/moderation`, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
    params: data,
  })
