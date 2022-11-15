import nc from "next-connect";
import { onError } from "@middlewares/onErrors";
import axios from "axios";
import { jwtMiddleware } from "@middlewares/jwt";
import { v4 as uuidV5 } from "uuid";

const wooUrl = process.env.woocomApi;

const defaultData = {
  name: `Test ${uuidV5()}`,
  regular_price: "5",
  description: "",
  short_description: "",
  type: "simple",
  virtual: true,
  ticket: true,
};

const handler = nc({ onError });

handler.use(jwtMiddleware);

handler.post(async (req, res) => {
  const { user } = req;

  const headers = {
    Authorization: `Bearer ${user.token}`,
  };
  try {
    const { data } = await axios.post(`${wooUrl}/products`, defaultData, {
      headers,
    });

    return res.status(200).json({
      data: data,
    });
  } catch (e) {
      console.log(e)
    if (axios.isAxiosError(e)) {
      return res.status(e.response?.status || 500).json({
        data: e.response?.data,
      });
    }
    if (e){
        return res.status(500).json({
            data: e.message,
        });
    }
  }
});

export default handler;
