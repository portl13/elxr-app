import { getEventById } from "../../../lib/api";

export default async (req, res) => {
  try {
    const EventsRequest = req.body.ids.map((id) => {
      return getEventById({
        identifier: id,
      });
    });

    const events = await Promise.all(EventsRequest);

    res.status(200).json({ events });
  } catch (error) {
    res.status(200).json({ message: "lo siento", error: error });
  }
};
