import { jwtMiddleware } from "@middlewares/jwt";
import axios from "axios";
import nc from "next-connect";
import {onError} from "@middlewares/onErrors";

const XAuthEmail = process.env.XAuthEmail;
const XAuthKey = process.env.XAuthKey;
const AccountId = process.env.AccountId;

const url = `https://api.cloudflare.com/client/v4/accounts/${AccountId}/stream/direct_upload`;

const router = nc({ onError });

router.use(jwtMiddleware);

router.post(async (req, res) => {
  const { user } = req;
  try {
    const { data } = await axios.post(
      url,
      {
        maxDurationSeconds: 3600,
        creator: `creator-id_${user.id}`
      },
      {
        headers: {
          "X-Auth-Email": XAuthEmail,
          "X-Auth-Key": XAuthKey,
          "Upload-Creator": `creator-id_${user.id}`
        },
      }
    );
    if (!data.success) {
      return res.status(400).json(data.errors);
    }
    return res.json(data.result);
  } catch (e) {
    res.status(400).json(e);
  }
});

export default router;
