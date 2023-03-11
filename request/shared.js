import axios from "axios";
import {genericFetchPost, getCreator} from "@request/creator";
import {genericFetch} from "@request/dashboard";
import {getToken} from "next-auth/jwt";

const url = `${process.env.apiURl}/media/`;
const urlProduct = `${process.env.productApi}/downloadable-file/`;
const countViewUrl = `${process.env.baseUrl}/wp-json/post-views-counter/view-post`;

export const uploadGeneralImage = async (token, formData) => {
  const res = await axios.post(url, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const uploadGeneralDownloable = async (token, formData) => {
  const res = await axios.post(urlProduct, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const countView = async (id) => {
  await axios.get(`${countViewUrl}/${id}/view-post/`);
};

export const getDataSever = async (url, req) => {
  const session = await getToken({ req });
  const token = !session ? null : session?.user?.token;
  let data = "";
  try {
    data = token ? await genericFetch(url, token) : await getCreator(url);
  } catch (e) {
    console.log(e);
  }

  return data;
};
