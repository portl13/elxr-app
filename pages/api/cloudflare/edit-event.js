import { jwtMiddleware } from "@middlewares/jwt";
import nc from "next-connect";
import { onError } from "@middlewares/onErrors";
import { createEventsFecth } from "@request/dashboard";
import {
  createdTicket,
  createRoom,
  createStream,
  updateEventId,
  updateStream,
  updateTicket,
} from "@api/cloudflare/functions";

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
    let room = "";

    if (body.type_stream === "webcam" && !Boolean(body.room)) {
      room = await createRoom(body);
    }

    if (body.type_stream === "rtmp" && Boolean(body.stream)) {
      await updateStream(body, user);
    }

    if (body.type_stream === "rtmp" && !Boolean(body.stream)) {
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

    if (room) {
      data = {
        ...data,
        room,
      };
    }

    const { event_id } = await createEventsFecth(urlEvents, user.token, data);

    if (body.visability === "ticketed" && Boolean(ticketId)) {
      await updateEventId(ticketId, event_id, user);
    }

    return res.status(200).json({ event_id });
  } catch (e) {
    console.log("🚀 ~ file: edit-event.js:71 ~ router.post ~ e:", e.response)
    return res.status(500).json(e);
  }
});

export default router;
