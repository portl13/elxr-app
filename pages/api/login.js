import axios from "axios";
import nc from "next-connect";
import { onError } from "@middlewares/onErrors";
const handler = nc({ onError });

const endpoint = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const secret = process.env.TurnstileSecretKey;

handler.post(async (req, res) => {
    const { token } = req.body;
    try {
        const body = `secret=${encodeURIComponent(
            secret
        )}&response=${encodeURIComponent(token)}`;

        const { data } = await axios.post(endpoint, body);

        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ message: error.toString() });
    }
});

export default handler;
