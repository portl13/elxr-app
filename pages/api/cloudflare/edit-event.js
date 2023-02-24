import { jwtMiddleware } from "@middlewares/jwt";
import nc from "next-connect";
import { onError } from "@middlewares/onErrors";
import { createEventsFecth } from "@request/dashboard";
import {createdTicket, createStream, updateEventId, updateStream, updateTicket} from "@api/cloudflare/functions";



const baseUrl = process.env.apiV2;
const urlEvents = `${baseUrl}/channel-event/`;

const router = nc({ onError });
router.use(jwtMiddleware);

router.post(async (req, res) => {
  const { user, body } = req;

  try {
    let ticketId = "";
    let stream = "";
    let data = { ...body };

    if (
      (body.type_stream === "rtmp" && Boolean(body.stream)) ||
      (body.type_stream === "webcam" && Boolean(body.stream))
    ) {
      await updateStream(body, user);
    }

    if (
      (body.type_stream === "rtmp" && !Boolean(body.stream)) ||
      (body.type_stream === "webcam" && !Boolean(body.stream))
    ) {
      stream = await createStream(body, user);
    }

    if (body.visability === "ticketed" && Boolean(body?.ticket_id)) {
      await updateTicket(body, user);
    }

    if (body.visability === "ticketed" && !Boolean(body?.ticket_id)) {
      ticketId = await createdTicket(body, user);
    }

    if (stream) {
      data = {
        ...data,
        stream,
      };
    }

    const { event_id } = await createEventsFecth(urlEvents, user.token, data);

    if (body.visability === "ticketed" && !Boolean(body?.ticket_id)) {
      await updateEventId(ticketId, event_id, user);
    }

    return res.status(200).json({ event_id });
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
});

export default router;
