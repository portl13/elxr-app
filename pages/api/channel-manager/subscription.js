const wooUrl = process.env.woocomApi

const defaultData = {
  name: '',
  regular_price: '0',
  description: '',
  short_description:'',
  type: 'subscription',
  meta_data: [
    {
      key: '_subscription_period',
      value: 'month',
    },
    {
      key: '_subscription_length',
      value: '0',
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
  ]
}

export const createSubscription = (user, userData) => {
  const data = { ...defaultData, ...userData }
  return axios.post(`${wooUrl}subscriptions`, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
    params: data,
  })
}
