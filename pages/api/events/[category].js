import { getEventByCategory } from "../../../lib/api";

export default async (req, res) => {

    const events = await getEventByCategory(req.body);

    res.status(200).json(events);

}


