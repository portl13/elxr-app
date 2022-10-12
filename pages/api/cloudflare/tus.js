import { jwtMiddleware } from "@middlewares/jwt";
import axios from "axios";
import nc from "next-connect";
import { onError } from "@middlewares/onErrors";
import jwt from "jsonwebtoken";

const XAuthEmail = process.env.XAuthEmail;
const XAuthKey = process.env.XAuthKey;
const AccountId = process.env.AccountId;

const url = `https://api.cloudflare.com/client/v4/accounts/${AccountId}/stream?direct_user=true`;

const router = nc({ onError });

router.use(async (req, res, next) => {
  if (!req.query.token) {
    return res.status(401).json({ message: 'No token provided' })
  }
  const token = req.query.token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user ={ id: decoded.data.user.id, token}
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' })
  }
  next()
});

router.post(async (req, res) => {
  const { user } = req;

  try {
    const { headers } = await axios.post(
      url,
      {},
      {
        headers: {
          "X-Auth-Email": XAuthEmail,
          "X-Auth-Key": XAuthKey,
          'Authorization': `bearer ${XAuthKey}`,
          "Upload-Creator": `creator-id_${user.id}`,
          "Tus-Resumable": "1.0.0",
          "Upload-Length": req.headers['upload-length'],
          //"Upload-Metadata": req.headers['upload-metadata']
        },
      }
    );

    res.setHeader('Access-Control-Expose-Headers', 'Location')
    res.setHeader('Access-Control-Allow-Headers', '*')
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Location', headers['location'])
    res.setHeader('stream-media-id', headers['stream-media-id'])
    res.status(201).json();
  } catch (e) {
    console.log('aqui error', e)
    return res.status(400).json(e);
  }
});

export default router;
