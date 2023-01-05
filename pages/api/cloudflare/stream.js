import { jwtMiddleware } from "@middlewares/jwt";
import axios from "axios";
import nc from "next-connect";
import { onError } from "@middlewares/onErrors";

const XAuthEmail = process.env.XAuthEmail;
const XAuthKey = process.env.XAuthKey;
const AccountId = process.env.AccountId;


const url = `https://api.cloudflare.com/client/v4/accounts/${AccountId}/stream/live_inputs`;

const router = nc({ onError });
router.use(jwtMiddleware);

router.get(async (req, res)=>{
    const {query} = req
    try {

        const { data } = await  axios.get(`${url}/${query.uid}/`,{
            headers:{
                "X-Auth-Email": XAuthEmail,
                "X-Auth-Key": XAuthKey,
                'Authorization': `bearer ${XAuthKey}`,
            }
        })

        return res.status(200).json(data.result)
    }catch (e){
        console.log(e)
        return res.status(500).json(e)
    }
})

export default router;