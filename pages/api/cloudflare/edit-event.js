import { jwtMiddleware } from "@middlewares/jwt";
import axios from "axios";
import nc from "next-connect";
import { onError } from "@middlewares/onErrors";
import {createEventsFecth} from "@request/dashboard";
import {LIVEPEER_PROFILE} from "@utils/constant";

const XAuthEmail = process.env.XAuthEmail;
const XAuthKey = process.env.XAuthKey;
const AccountId = process.env.AccountId;

const baseUrl = process.env.apiV2;
const urlEvents = `${baseUrl}/channel-event/`;
const url = `https://api.cloudflare.com/client/v4/accounts/${AccountId}/stream/live_inputs`;
const livepeerUrl = `${process.env.LIVEPEER_API_URL}/stream`
const productUrl = process.env.productApi;

const router = nc({ onError });
router.use(jwtMiddleware);

router.post(async (req, res)=>{
    const {user, body} = req

    try {
        let data = {...body}

        const streamData = {
            "meta": {
                "name": data.title
            },
            "recording": {
                "mode": data.record_stream ? "automatic" : "off"
            },
            "defaultCreator": `creator-id_${user.id}`
        }

        await  axios.put(`${url}/${body.stream}`, streamData,{
            headers:{
                "X-Auth-Email": XAuthEmail,
                "X-Auth-Key": XAuthKey,
                'Authorization': `bearer ${XAuthKey}`,
            }
        })

        if (body.stream_livepeer === ""){
            const result = await axios.post(livepeerUrl, {
                name: body.title,
                profiles: LIVEPEER_PROFILE
            }, {
                headers: {
                    'Authorization': `Bearer ${process.env.LIVEPEER_API_TOKEN}`
                }
            })
            data = {
                ...data,
                stream_livepeer: result.data.id
            }
        }

        if (body.visability === "ticketed") {
            const productData = {
                id: body?.ticket_id,
                name: `ticket for ${body?.title}`,
                regular_price: `${body?.ticket_price}`,
                description: `${body?.description}`,
                short_description: `${body?.description}`,
                status: "publish"
            };

            if (body.thumbnail !== ''){
                productData.featured_image = {
                    id: body.thumbnail
                }
            }

            await axios.post(productUrl, productData, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
        }

        const { event_id } = await createEventsFecth(urlEvents, user.token, data);

        return res.status(200).json({event_id})
    }catch (e){
        console.log(e)
        return res.status(500).json(e)
    }
})

export default router;