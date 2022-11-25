import axios from "axios";

const baseApi = process.env.bossApi;

export const getMessageList = (user, data) =>
  axios.get(baseApi + "/messages", {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
    params: data,
  });

export const postMessage = (user, data) =>
  axios.post(baseApi + "/messages", data, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });

export const createMessage = (user, data) =>
  axios.post(baseApi + "/messages", data, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });

export const uploadMedia = (user, data, setProgress) =>
  axios.post(baseApi + "/media/upload", data, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
    onUploadProgress: (progressEvent) => {
      const { loaded, total } = progressEvent;
      const percentage = Math.floor((loaded * 100) / total);
      setProgress(percentage);
    },
  });

export const uploadMsgMedia = (user, data) =>
  axios.post(baseApi + `/activity`, data, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });

export const deleteMsg = (user, id, data) =>
  axios.delete(baseApi + `/messages/${id}`, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
    data,
  });

export const postMessageAction = (user, id, data) =>
  axios.post(baseApi + `/messages/action/${id}`, data, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });

export const postReadMsg = (user, id) =>
  axios.patch(
    baseApi + `/messages/starred/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    }
  );

export const blockMember = (user, id) =>
  axios.post(baseApi + `/moderation`, id, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });

export const getConnections = (user, id) => {
  let paramData = {
    page: 1,
    per_page: 20,
    scope: "all",
    type: "active",
    exclude: id ? [id] : [],
  };
  if (user) {
    paramData.headers = {
      Authorization: `Bearer ${user?.token}`,
    };
  }
  return axios.get(`${baseApi}/members`, {params:paramData});
};

export const recipientsDataFetch = (user, id) => {
  let paramData = {
    method: "GET",
  };
  if (user) {
    paramData.headers = {
      Authorization: `Bearer ${user?.token}`,
    };
  }
  return axios(`${baseApi}/members/${id}`, paramData);
};

export const SearchConnections = (user, id, value) => {
  let paramData = {
    method: "GET",
    per_page: 20,
    page: 1,
    scope: "all",
    search: value || "",
    exclude: id || "",
  };

  if (user) {
    paramData.headers = {
      Authorization: `Bearer ${user?.token}`,
    };
  }

  return axios.get(`${baseApi}/members`, {params: paramData});
};
