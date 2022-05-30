import axios from 'axios';

export default async (req, res) => {
    const url = process.env.LIVEPEER_API_URL
    const token = process.env.LIVEPEER_API_TOKEN
    const id = req.query.id

    try {
        const { data } = await axios.get(`${url}/stream/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
    
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json(error)
    }


}
