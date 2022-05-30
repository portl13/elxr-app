import Axios from "axios";
import Router from "next/router";
import { useRef, useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
const useRegister = ({ blocking, setBlocking }) => {
  const { setUser } = useContext(UserContext);
  const isMounted = useRef(true);
  const registerUrl = process.env.baseUrl + "/wp-json/wp/v2/users/register";
  const loginUrl = process.env.baseUrl + "/wp-json/jwt-auth/v1/token";
  //const profileUrl = process.env.bossApi + "/members/";
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState({
    status: false,
    message: "",
  });
  const source = Axios.CancelToken.source();
  const register = async ({ username, email, password }) => {
    setBlocking(true);
    setFail({
      status: false,
      message: "",
    });
    try {
      if (isMounted) {
        const register = Axios.post(
          registerUrl,
          {
            username,
            email,
            password,
          },
          {
            cancelToken: source.token,
          }
        );
        const login = Axios.post(
          loginUrl,
          { username: email, password },
          {
            cancelToken: source.token,
          }
        );
        const data = await Promise.all([register, login]);
        // const respuesta = await Axios.get(profileUrl + data[1].data.data.id, {
        //     headers: {
        //         'Authorization': `Bearer ${data[1].data.data.token}`
        //     }
        // })
        // const userData = Object.assign(data[1].data.data, respuesta.data)
        // setUser(userData);
        // Router.push('/profile-edit?tab=profile-update');
        Router.push("/signupmsg");
      }
    } catch (e) {
      if (isMounted) {
        if (Axios.isCancel(e)) {
          setBlocking(false);
        } else {
          if (e.response) {
            const { data } = e.response;
            setFail({
              status: true,
              message: data.message,
            });
            setBlocking(false);
          }
          setBlocking(false);
        }
      }
    }
  };
  useEffect(() => {
    return () => {
      isMounted.current = false;
      source.cancel();
    };
  }, []);
  return {
    success,
    fail,
    register,
    setFail,
  };
};
export default useRegister;
