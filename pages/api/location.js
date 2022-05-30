import Axios from "axios";

export default async (req, res) => {

    const apiKey = process.env.API_KEY_OPENCAGE;

    const url = `https://api.opencagedata.com/geocode/v1/json?key=${apiKey}&language=en&pretty=1&no_annotations=1&abbrv=1&limit=4`

    const { data } = await Axios.get(url, { params: { q: req.query.location } })

    res.status(200).json(data.results);

}
