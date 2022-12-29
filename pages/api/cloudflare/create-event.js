import { jwtMiddleware } from "@middlewares/jwt";
import axios from "axios";
import nc from "next-connect";
import { onError } from "@middlewares/onErrors";
import { createEventsFecth } from "@request/dashboard";

const XAuthEmail = process.env.XAuthEmail;
const XAuthKey = process.env.XAuthKey;
const AccountId = process.env.AccountId;

const baseUrl = process.env.apiV2;
const urlEvents = `${baseUrl}/channel-event/`;
const url = `https://api.cloudflare.com/client/v4/accounts/${AccountId}/stream/live_inputs`;
const productUrl = process.env.productApi;

const router = nc({ onError });
router.use(jwtMiddleware);

router.post(async (req, res) => {
  const { user, body } = req;

  try {
    let ticketId = "";

    if (body.visability === "ticketed") {
      const productData = {
        name: `ticket for ${body?.title}`,
        regular_price: `${body?.ticket_price}`,
        description: `${body?.description}`,
        short_description: `${body?.description}`,
        status: "publish",
        is_ticket: true,
      };

      if (body.thumbnail !== ''){
        productData.featured_image = {
          id: body.thumbnail
        }
      }

      const { data } = await axios.post(productUrl, productData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      ticketId = data.data.id;
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
      stream: data.result.uid
    };

    if (body.visability === "ticketed") {
      dataEvent.ticketId = ticketId;
    }

    const { event_id } = await createEventsFecth(
      urlEvents,
      user.token,
      dataEvent
    );

    if (body.visability === "ticketed") {
      await axios.post(
        `${baseUrl}/utils/update`,
        {
          id: ticketId,
          key: "_event_id",
          value: event_id,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
    }

    return res.status(200).json({ event_id });
  } catch (e) {
    console.log(e)
    return res.status(500).json(e);
  }
});

export default router;
