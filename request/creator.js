import axios from "axios";
import Cookies from "js-cookie";

export const genericFetch = async (url) => {
  const res = await axios.get(url);
  return res.data;
};

export const genericFetchWithToken = async (url) => {
  let config = {};
  let token = Cookies.get("user-token");

  if (token) {
    config.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  const res = await axios.get(url, config);
  return res.data;
};
export const genericFetchWithTokenFeed = async (key) => {
  let url = key;
  let config = {};
  let token = Cookies.get("user-token");

  if (token) {
    config.headers = {
      Authorization: `Bearer ${token}`,
    };
    url += "&scope=following";
  }

  const res = await axios.get(url, config);
  return res.data;
};

export const genericFetchPost = async (url) => {
  const res = await axios.post(url);
  return res.data;
};

export const genericFetchPublicWithHeader = async (url) => {
  return await axios.get(url);
};

export const getCreator = genericFetch;

export const getFetchPublic = async (key, tok = null) => {
  const [url, token] = Array.isArray(key) ? key : [key, tok];

  const res = await axios.get(
    url,
    !token
      ? {}
      : {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
  );
  return res.data;
};
