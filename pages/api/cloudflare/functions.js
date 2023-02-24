import axios from "axios";
const productUrl = process.env.productApi;
const XAuthEmail = process.env.XAuthEmail;
const XAuthKey = process.env.XAuthKey;
const AccountId = process.env.AccountId;
const baseUrl = process.env.apiV2;
const url = `https://api.cloudflare.com/client/v4/accounts/${AccountId}/stream/live_inputs`;

export const updateTicket = async (body, user) => {
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

export const updateStream = async  (body, user) => {
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
}

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

export const updateEventId = async  (ticketId, event_id, user) =>{
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
}