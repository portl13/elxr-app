import axios from "axios";

const baseApi = process.env.bossApi;
const accountDetailsAPi = process.env.baseUrl + "/wp-json/portl/v1/";

export const getAccountNav = (user) => axios(baseApi + "/account-settings", {
    method: "GET",
    headers: {
        'Authorization': `Bearer ${user?.token}`
    },
})

export const getAccountDetails = (user) =>
    axios(`${accountDetailsAPi}my-account/edit-account`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${user?.token}`,
        },
    });

export const addAccountDetails = (user, data) =>
    axios.post(`${accountDetailsAPi}my-account/edit-account`, data,{
   
    headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });

export const updatePassword = (user, data) =>
    axios.post(`${accountDetailsAPi}my-account/edit-password`, data,{
   
    headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });



export const getAccountSetting = (user, nav) => axios(`${baseApi}/account-settings/${nav}`, {
    method: "GET",
    headers: {
        'Authorization': `Bearer ${user?.token}`
    },
})

export const updateAccountSetting = (user, nav, data) =>
    axios.patch(`${baseApi}/account-settings/${nav}?${data}`, {}, {
        headers: {
            'Authorization': `Bearer ${user?.token}`
        },
    })


