import axios from "axios";

const url = process.env.baseUrl;
const wooUrl = process.env.woocomApi;
const baseUrl = process.env.apiV2;

const defaultData = {
  name: "",
  regular_price: "5",
  description: "",
  short_description: "",
  type: "subscription",
  virtual: true,
  meta_data: [
    {
      key: "_subscription_period",
      value: "month",
    },
    {
      key: "_subscription_length",
      value: "0",
    },
    {
      key: "_subscription_period_interval",
      value: "1",
    },
    {
      key: "_subscription_sign_up_fee",
      value: "0",
    },
    {
      key: "_subscription_trial_period",
      value: "day",
    },
    {
      key: "_subscription_trial_length",
      value: "0",
    },
    {
      key: "_subscription_price",
      value: "0",
    }
  ],
};

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
    // Create User Token
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

    const { data } = await axios.post(`${wooUrl}/products`, dataSubscription, {
      headers,
    });

    await axios.post(
      `${baseUrl}/utils/update/user`,
      {
        id: user.id,
        key: "_subscription_id",
        value: data.id,
      },
      { headers }
    );

    res.status(200).json({ message: "success" });
  } catch (e) {
    res.status(500).json(e);
  }
};
