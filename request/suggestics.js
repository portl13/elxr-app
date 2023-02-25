import axios from "axios";
const SUGGESTIC_URl_BASE = `${process.env.baseUrl}/wp-json/elxr/v1/suggestics`;

const urlRegister = `${SUGGESTIC_URl_BASE}/register`;
const urlLogin = `${SUGGESTIC_URl_BASE}/login`;

export const suggesticsRegister = async (email, display_name, token) => {
  const { data: res } = await axios.post(
    urlRegister,
    {
      email: email,
      name: display_name,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.suggestic_id;
};

export const suggesticsLogin = async (userID, token) => {
  const { data } = await axios.post(
    urlLogin,
    {
      user_id: String(userID),
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data.accessToken;
};
