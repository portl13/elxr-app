import {StreamChat} from "stream-chat";

const key = process.env.NEXT_PUBLIC_GETSTREAM_KEY
const secret = process.env.NEXT_PUBLIC_GETSTREAM_SECRET_KEY

export default async (req, res) => {

    const { body } = req;
    const { channelID, name } = body;


    try {
        // Create User Token
        const serverClient = new StreamChat(key, secret)

        const channel = serverClient.channel('gaming',`channel-${String(channelID)}`, {
            name:'Portl Demo',
            created_by_id: String(channelID)
        });

        // Here, 'travel' will be the channel ID
        await channel.create();
        res.status(200).json({'creado':''})
    } catch (e) {
        console.log(e)
        res.status(500).json(e)
    }
}
