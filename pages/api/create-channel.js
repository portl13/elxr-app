import axios from "axios";
import {defaultData} from "@utils/constant";

const url = process.env.baseUrl;
const baseUrl = process.env.apiV2;
const productUrl = process.env.apiURl + "/product";

export default async (req, res) => {
  const { body } = req;
  const { user, dataStore } = body;

  const headers = {
    Authorization: `Bearer ${user.token}`,
  };

  const dataSubscription = {
    ...defaultData,
    name: `${dataStore.store_name} Subscription`,
  };

  try {
    // Create User Store
    await axios.post(
      `${url}/wp-json/portl/v1/channel/`,
      {
        user_id: user.id,
        data: dataStore,
      },
      {
        headers,
      }
    );

    // Create Subscription
    const { data } = await axios.post(productUrl, dataSubscription, {
      headers,
    });

    // Add Subscription User
    await axios.post(
      `${baseUrl}/utils/update/user`,
      {
        id: user.id,
        key: "_subscription_id",
        value: data.data.id,
      },
      { headers }
    );

    res.status(200).json({ message: "success" });
  } catch (e) {
    console.log(e)
    res.status(500).json(e);
  }
};
