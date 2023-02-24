import { jwtMiddleware } from "@middlewares/jwt";
import axios from "axios";
import nc from "next-connect";
import { onError } from "@middlewares/onErrors";
import { createEventsFecth } from "@request/dashboard";
import {createdTicket, createStream, updateEventId} from "@api/cloudflare/functions";

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
    let stream = "";

    if (body.visability === "ticketed") {
      ticketId = await createdTicket(body, user);
    }

    if (body.type_stream === "rtmp" || body.type_stream === "webcam") {
      stream = await createStream(body, user);
    }

    let dataEvent = {
      ...body,
      stream,
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
      await updateEventId(ticketId, event_id, user)
    }

    return res.status(200).json({ event_id });
  } catch (e) {
    return res.status(500).json(e);
  }
});

export default router;
