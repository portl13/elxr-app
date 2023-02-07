import axios from "axios";

export const genericFetch = async (key, token) => {
  if (Array.isArray(key)) {
    const [url, token] = key;
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  }

  const { data } = await axios.get(key, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const genericFetchPost = async (url, token, data) => {
  const res = await axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const genericDelete = async (url, token, data = {}) => {
  const res = await axios.delete(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data
  });
  return res.data;
};

export const getEvents = async (url) => {
  const res = await axios.get(url);
  return res.data;
};

export const getProducts = async (key, token) => {
  if (Array.isArray(key)) {
    const [url, token] = key;
    return await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return await axios.get(key, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const genericFetchWithHeader = async (key, token) => {
  if (Array.isArray(key)) {
    const [url, token] = key;
    return await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return await axios.get(key, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getCountries = async (key, token) => {
  if (Array.isArray(key)) {
    const [url, token] = key;
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  }

  const { data } = await axios.get(key, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const uploadProductImage = async (url, token, formData) => {
  const res = await axios.post(url, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const createProduct = async (url, token, data) => {
  const res = await axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const updateProduct = genericFetchPost;

export const createChannelFecth = genericFetchPost;

export const createEventsFecth = genericFetchPost;

export const getCourses = genericFetch;

export const getCourseById = genericFetch;

export const getCourseUsers = genericFetch;

export const getCommunities = genericFetch;

export const getOrderById = genericFetch;

export const getProductCategories = genericFetch;

export const getProductTags = genericFetch;

export const getProfile = genericFetch;

export const getChannels = genericFetch;

export const getChannelById = genericFetch;

export const getCategories = genericFetch;

export const getStoreDetails = genericFetch;

export const getStoreSupport = genericFetch;

export const getChannelEvents = genericFetch;

export const getEventByID = genericFetch;

export const getStates = getCountries;

export const getOrders = genericFetch;
