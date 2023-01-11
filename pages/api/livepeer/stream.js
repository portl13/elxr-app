import { jwtMiddleware } from "@middlewares/jwt";
import axios from "axios";
import nc from "next-connect";
import { onError } from "@middlewares/onErrors";

const livepeerUrl = `${process.env.LIVEPEER_API_URL}/stream`;

const router = nc({ onError });

router.get(async (req, res)=>{
    const {query} = req
    try {
        const { data } = await  axios.get(`${livepeerUrl}/${query.uid}`,{
            headers:{
                'Authorization': `bearer ${process.env.LIVEPEER_API_TOKEN}`,
            }
        })
        return res.status(200).json(data)
    }catch (e){
        console.log(e)
        return res.status(500).json(e)
    }
})

export default router;