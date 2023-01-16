import { corsMiddleware } from "@middlewares/cors";
import axios from "axios";
import nc from "next-connect";
import { onError } from "@middlewares/onErrors";
import { jwtMiddleware } from "@middlewares/jwt";

const wooUrl = process.env.woocomApi;
const key = process.env.WOO_CK;
const secret = process.env.WOO_CS;

const handler = nc({ onError });

handler.use(corsMiddleware);
handler.use(jwtMiddleware);
//
handler.put(async (req, res) => {
  const { body } = req;

  try {
    const {data} = await axios.put(
      `${wooUrl}/products/${body.id}?consumer_key=${key}&consumer_secret=${secret}`,
      body
    );
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
});

export default handler;
