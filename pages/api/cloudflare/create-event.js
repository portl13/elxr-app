import { jwtMiddleware } from "@middlewares/jwt";
import axios from "axios";
import nc from "next-connect";
import { onError } from "@middlewares/onErrors";
import { createEventsFecth } from "@request/dashboard";
import { LIVEPEER_PROFILE } from "@utils/constant";

const XAuthEmail = process.env.XAuthEmail;
const XAuthKey = process.env.XAuthKey;
const AccountId = process.env.AccountId;

const baseUrl = process.env.apiV2;
const urlEvents = `${baseUrl}/channel-event/`;
const url = `https://api.cloudflare.com/client/v4/accounts/${AccountId}/stream/live_inputs`;
const livepeerUrl = `${process.env.LIVEPEER_API_URL}/stream`;

const router = nc({ onError });
router.use(jwtMiddleware);

router.post(async (req, res) => {
  const { user, body } = req;

  try {

    if (body.visability === 'ticketed'){
      
    }

    const streamData = {
      meta: {
        name: body.title,
      },
      recording: {
        mode: body.record_stream ? "automatic" : "off",
      },
      defaultCreator: `creator-id_${user.id}`,
    };

    const { data } = await axios.post(url, streamData, {
      headers: {
        "X-Auth-Email": XAuthEmail,
        "X-Auth-Key": XAuthKey,
        Authorization: `bearer ${XAuthKey}`,
      },
    });

    let dataEvent = {
      ...body,
      stream: data.result.uid,
    };

    const result = await axios.post(
      livepeerUrl,
      {
        name: body.title,
        profiles: LIVEPEER_PROFILE,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.LIVEPEER_API_TOKEN}`,
        },
      }
    );
    dataEvent = {
      ...dataEvent,
      stream_livepeer: result.data.id,
    };

    const { event_id } = await createEventsFecth(
      urlEvents,
      user.token,
      dataEvent
    );
    return res.status(200).json({ event_id });
  } catch (e) {
    console.log(e);
    return req.status(500).json(e);
  }
});

export default router;
