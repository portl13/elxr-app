import Axios from "axios";

export default async (req, res) => {

    const { body, query } = req;

    const baseApi = process.env.bossApi;

    try {
        const { data } = await Axios.post(`${baseApi}/members/${query.user_id}/avatar`, body,
            {
                headers: {
                    'Authorization': `Bearer ${query.token}`,
                    'Accept-Language': 'en-US,en;q=0.8',
                    'Content-Type': 'multipart/form-data;',
                }
            }
        )

        console.log(data);

        res.status(200).json(data)
    } catch (error) {
        console.log(error);
        res.status(200).json({ 'hola': 'hola' })
    }

}
