import Axios from "axios";

export default async (req, res) => {

    const { body } = req;

    const channelUrl = process.env.baseUrl + '/wp-json/portl-social/v1/channels/'

    try {
        const { data } = await Axios.post(channelUrl, body)

        res.status(200).json(data)

    } catch (error) {
        res.status(403).json(error)
    }
}
