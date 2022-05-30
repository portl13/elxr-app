import Axios from "axios";

const url = 'https://data.portl.live/api/wcfm/v2/channel/';

export default async (req, res) => {

    if (!req.headers?.authorization) {
        return res.status(403).json({
            code: 'not_authorized',
            message: 'is not authorized to do so.'
        })
    }

    const token = req.headers.authorization.split(' ')[1];

    const { channel_name, channel_description, social, id} = req.body

    const {data} = await Axios.post(url + id, {
        channel_name,
        channel_description,
        social,
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })


    return res.status(200).json(data)
}