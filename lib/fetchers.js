import Axios from "axios";

export const fetcher = (url, body) => Axios.post(url, body).then(res=> res.data);

export const fetcherGet = (url, params) => Axios.get(url,{params}).then(res=> res.data);

export const simpleGetFecher = (url) => Axios.get(url).then( res => res.data );
