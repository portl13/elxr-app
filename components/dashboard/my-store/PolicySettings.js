import React, { useContext, useEffect } from 'react'
import { UserContext } from '@context/UserContext'
import useSWRImmutable from 'swr/immutable'
import { getStoreDetails } from '@request/dashboard'
import PolicySettingsForm from './PolicySettingsForm'
import { useFormik } from 'formik'
import { updatePolicies } from '@api/channel-store.api'
import { useAlert } from 'react-alert'
import { TIMEOUT } from '@utils/constant'

const url = process.env.baseUrl + '/wp-json/wcfmmp/v1'

function PolicySettings() {
  const alert = useAlert()
  const { user } = useContext(UserContext)
  const token = user?.token
  const id = user?.id

  const { data: storeSettings } = useSWRImmutable(
    token && id ? [`${url}/store-vendors/${id}`, token] : null,
    getStoreDetails
  )

  const form = useFormik({
    initialValues: {
      cancellation_policy: '',
      refund_policy: '',
      shipping_policy: '',
    },
    onSubmit: async (values) => {
      const { cancellation_policy, refund_policy, shipping_policy } = values
      const formData = {
        data: {
          cancellation_policy,
          refund_policy,
          shipping_policy,
        },
        user_id: user.id,
      }
      updatePolicies(user, formData)
        .then(() => {
          alert.success('Store policy updated successfully.', TIMEOUT)
        })
        .catch(() => {
          alert.error(
            'Please change any value from the define fields .',
            TIMEOUT
          )
        })
    },
  })

  useEffect(() => {
    if (!storeSettings) return
    form.setValues(storeSettings.vendor_policies)
  }, [storeSettings])

  

  return (
    <div className="policy-settings">
      <div>
        <PolicySettingsForm
          title={
            storeSettings &&
            storeSettings.vendor_policies &&
            storeSettings.vendor_policies.shipping_policy_heading
          }
          data={
            storeSettings &&
            storeSettings.vendor_policies &&
            storeSettings.vendor_policies.shipping_policy
          }
          form={form}
          field="shipping_policy"
        />
        <PolicySettingsForm
          title={
            storeSettings &&
            storeSettings.vendor_policies &&
            storeSettings.vendor_policies.refund_policy_heading
          }
          data={
            storeSettings &&
            storeSettings.vendor_policies &&
            storeSettings.vendor_policies.refund_policy
          }
          form={form}
          field="refund_policy"
        />
        <PolicySettingsForm
          title={
            storeSettings &&
            storeSettings.vendor_policies &&
            storeSettings.vendor_policies.cancellation_policy_heading
          }
          data={
            storeSettings &&
            storeSettings.vendor_policies &&
            storeSettings.vendor_policies.cancellation_policy
          }
          form={form}
          field="cancellation_policy"
        />
      </div>
    </div>
  )
}

export default PolicySettings
