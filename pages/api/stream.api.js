import axios from "axios";
const baseApi = process.env.baseUrl + "/wp-json/portl/v1/";


export const createEventStream = (user, data) =>
  axios.post(baseApi + "stream", data, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });

//   export const getStream = (user) =>
//   axios.get(`${baseApi}stream/user_id=${user.id}`,  {
//     headers: {
//       Authorization: `Bearer ${user?.token}`,
//     },

//   });