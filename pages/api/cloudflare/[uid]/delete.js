import { jwtMiddleware } from "@middlewares/jwt";
import axios from "axios";
import nc from "next-connect";
import { onError } from "@middlewares/onErrors";

const XAuthEmail = process.env.XAuthEmail;
const XAuthKey = process.env.XAuthKey;
const AccountId = process.env.AccountId;

const url = `https://api.cloudflare.com/client/v4/accounts/${AccountId}/stream`;

const router = nc({ onError });

router.use(jwtMiddleware);

router.delete(async (req, res) => {
  const { query } = req;
  try {
    const { data } = await axios.delete(`${url}/${query.uid}`, {
      headers: {
        "X-Auth-Email": XAuthEmail,
        "X-Auth-Key": XAuthKey,
      },
    });
    return res.json(data);
  } catch (e) {
    res.status(400).json(e);
  }
});

export default router;
