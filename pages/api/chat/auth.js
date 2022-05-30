import {StreamChat} from "stream-chat";

const key = process.env.NEXT_PUBLIC_GETSTREAM_KEY
const secret = process.env.NEXT_PUBLIC_GETSTREAM_SECRET_KEY

export default async (req, res) => {

    const { body } = req;
    const { id } = body;
    try {
        // Create User Token
        const serverClient = new StreamChat(key, secret, {})
        const token = serverClient.createToken(String(id));
        res.status(200).json({token})
    } catch (e) {
        res.status(500).json(error)
    }
}
