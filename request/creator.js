import axios from "axios";

export const genericFetch = async (url) => {
  const res = await axios.get(url);
  return res.data;
};

export const genericFetchPublicWithHeader = async (url) => {
  return await axios.get(url);
}

export const getCreator = genericFetch;

export const getFetchPublic = async (url, token = null) => {
  const res = await axios.get(url, !token ? {} : {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
