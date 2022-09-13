import axios from 'axios'

const url = process.env.baseUrl
const wooUrl = process.env.woocomApi

const defaultData = {
  name: '',
  regular_price: '0',
  description: '',
  short_description: '',
  type: 'subscription',
  virtual: true,
  meta_data: [
    {
      key: '_subscription_period',
      value: 'month',
    },
    {
      key: '_subscription_length',
      value: '1',
    },
    {
      key: '_subscription_period_interval',
      value: '1',
    },
    {
      key: '_subscription_sign_up_fee',
      value: '0',
    },
    {
      key: '_subscription_trial_period',
      value: 'day',
    },
    {
      key: '_subscription_trial_length',
      value: '0',
    },
    {
      key: '_subscription_price',
      value: '0',
    },
    {
      key: '_all',
      value: false,
    },
    {
      key: '_live_stream',
      value: false,
    },
    {
      key: '_chat',
      value: false,
    },
    {
      key: '_social',
      value: false,
    },
    {
      key: '_archives',
      value: false,
    },
  ],
}

export default async (req, res) => {
  const { body } = req
  const { user, dataStore } = body

  const headers = {
    Authorization: `Bearer ${user.token}`,
  }

  const dataSubscription = {
    ...defaultData,
    name: `Subscription ${dataStore.store_name}`,
  }

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
    )

    await axios.post(`${wooUrl}/products`, dataSubscription, { headers })

    res.status(200).json({ creado: '' })
  } catch (e) {
    res.status(500).json(e)
  }
}
