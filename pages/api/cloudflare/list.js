import { jwtMiddleware } from "@middlewares/jwt";
import axios from "axios";
import nc from "next-connect";
import { onError } from "@middlewares/onErrors";

const XAuthEmail = process.env.XAuthEmail;
const XAuthKey = process.env.XAuthKey;
const AccountId = process.env.AccountId;

const url = `https://api.cloudflare.com/client/v4/accounts/${AccountId}/stream/`;

const router = nc({ onError });
router.use(jwtMiddleware);

router.get(async (req, res) => {
  const { user } = req;
  try {
    const { data } = await axios.get(url, {
      headers: {
        "X-Auth-Email": XAuthEmail,
        "X-Auth-Key": XAuthKey,
      },
      params: {
        creator: `creator-id_${user.id}`,
        include_counts: true,
        status: 'ready'
      },
    });
    return res.status(200).json(data);
  } catch (e) {
    return res.status(400).json(e);
  }
});

export default router;
