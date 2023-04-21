import axios from "axios";
const productUrl = process.env.productApi;
const XAuthEmail = process.env.XAuthEmail;
const XAuthKey = process.env.XAuthKey;
const AccountId = process.env.AccountId;
const baseUrl = process.env.apiV2;
const url = `https://api.cloudflare.com/client/v4/accounts/${AccountId}/stream/live_inputs`;
import jwt from "jsonwebtoken";
import { v4 as uuid4 } from "uuid";
import {stringToSlug} from "@lib/stringToSlug";

const app_access_key = process.env.StreamAppAccessKey;
const app_secret = process.env.StreamAppSecret;
const baseApi100ms = "https://api.100ms.live/v2";

const payload = {
  access_key: app_access_key,
  type: "management",
  version: 2,
  iat: Math.floor(Date.now() / 1000),
  nbf: Math.floor(Date.now() / 1000),
};

export const singToken = () => {
  return new Promise((resolve, reject) => {
    try {
      jwt.sign(
        payload,
        app_secret,
        {
          algorithm: "HS256",
          expiresIn: "24h",
          jwtid: uuid4(),
        },
        function (err, token) {
          if (err) {
            return resolve(err);
          }
          resolve(token);
        }
      );
    } catch (e) {
      reject(e);
    }
  });
};

export const updateTicket = async (body, user) => {
  const productData = {
    id: body?.ticket_id,
    name: `ticket for ${body?.title}`,
    regular_price: `${body?.ticket_price}`,
    description: `${body?.description}`,
    short_description: `${body?.description}`,
    status: "publish",
  };

  if (body.thumbnail !== "") {
    productData.featured_image = {
      id: body.thumbnail,
    };
  }

  await axios.post(productUrl, productData, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });
};

export const createdTicket = async (body, user) => {
  const productData = {
    name: `ticket for ${body?.title}`,
    regular_price: `${body?.ticket_price}`,
    description: `${body?.description}`,
    short_description: `${body?.description}`,
    status: "publish",
    is_ticket: true,
  };

  if (body.thumbnail !== "") {
    productData.featured_image = {
      id: body.thumbnail,
    };
  }

  const { data } = await axios.post(productUrl, productData, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });
  return data.data.id;
};

export const updateStream = async (body, user) => {
  const streamData = {
    meta: {
      name: body.title,
    },
    recording: {
      mode: body.record_stream ? "automatic" : "off",
    },
    defaultCreator: `creator-id_${user.id}`,
  };

  await axios.put(`${url}/${body.stream}`, streamData, {
    headers: {
      "X-Auth-Email": XAuthEmail,
      "X-Auth-Key": XAuthKey,
      Authorization: `bearer ${XAuthKey}`,
    },
  });
};

export const createStream = async (body, user) => {
  const streamData = {
    meta: {
      name: body.title,
    },
    recording: {
      mode: body.record_stream ? "automatic" : "off",
    },
    defaultCreator: `creator-id_${user.id}`,
  };

  const { data } = await axios.post(url, streamData, {
    headers: {
      "X-Auth-Email": XAuthEmail,
      "X-Auth-Key": XAuthKey,
      Authorization: `bearer ${XAuthKey}`,
    },
  });

  return data.result.uid;
};

export const createRoom = async (body) => {
    const room_data = {
        name: stringToSlug(body.title),
        description: body?.description,
        template_id: "642d845ab23611e78861ad99",
        region: "us",
    };

    const token = await singToken();

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const { data } = await axios.post(`${baseApi100ms}/rooms`, room_data, config);

    const { data: room_codes } = await axios.post(
        `${baseApi100ms}/room-codes/room/${data["id"]}`,
        {},
        config
    );

    return { id: data?.id, room_codes: room_codes?.data };
};

export const updateEventId = async (ticketId, event_id, user) => {
  await axios.post(
    `${baseUrl}/utils/update`,
    {
      id: ticketId,
      key: "_event_id",
      value: event_id,
    },
    {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }
  );
};
