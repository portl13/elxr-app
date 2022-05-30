import { getEventById } from "../../../lib/api";

export default async (req, res) => {

    const events = await getEventById(req.body);

    res.status(200).json(events);

}


