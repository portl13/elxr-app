import { jwtMiddleware } from "@middlewares/jwt";
import axios from "axios";
import nc from "next-connect";
import formidable from "formidable";
import FormData from "form-data";
import fs from "fs";

const url = process.env.apiV2;

const api_id = "5c63240b3aa78582ec4d26feb05a28d7";
const api_email = "contact@elxr.com";
const api_token = "b587430efb801f7f069181ee50f2ad0e1e91f";

const mediaUrl = `https://api.cloudflare.com/client/v4/accounts/${api_id}/stream`;

function onError(err, req, res, next) {
  if (err) {
    return res.status(500).json({ message: err.toString() });
  }
  // OR: you may want to continue
  next();
}

const uploadVideo = async (req) => {
  const { user } = req;
  try {
    const formData = new FormData();
    console.log(req.files.video[0]);
    const readStream = fs.createReadStream(req.files.video[0].filepath);
    formData.append("file", readStream, "hola");
    formData.append("upload_file", true);
    const headers = formData.getHeaders();
    const { data } = await axios.post(mediaUrl, formData, {
      headers: {
        Authorization: `Bearer ${user.token}`,
        ...headers,
        "x-auth-email": api_email,
        "x-auth-key": api_token,
        "Upload-Creator": user.id,
      },
    });
    return { status: true, message: data };
  } catch (error) {
    return { status: false, message: error.response?.data || error.toString() };
  }
};

const handler = nc({ onError });

handler.use(jwtMiddleware);
handler.use(async (req, res, next) => {
  const form = formidable({});
  form.parse(req, async (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    req.fields = fields;
    req.files = files;
    next();
  });
});

handler.post(async (req, res) => {
  //const { serverRuntimeConfig } = getConfig()
  try {
    const { status, message } = await uploadVideo(req);
    if (!status) {
      return res.status(500).json(message);
    }
    return res.json(message);
  } catch (e) {
    return res.status(500).json(e.toString());
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
