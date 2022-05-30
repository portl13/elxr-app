import axios from "axios";

const baseApi = process.env.bossApi;

export const getNotificationDetails = (user, data) =>
  axios.get(baseApi + "/notifications", {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
    params: data,
  });
export const deleteNotification = (user, id) =>
  axios.delete(`${baseApi}/notifications/${id}`, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });
export const updateNotification = (user, id, data) =>
  axios.patch(`${baseApi}/notifications/${id}`, data, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });

export const updateAllNotification = (user, list,data) => {
  const newList = list.map((ele) => axios.patch(baseApi + `/notifications/${ele.id}`, data, {
    headers: {
      'Authorization': `Bearer ${user?.token}`
    },
  }))
  return axios.all(newList)
};
