import React from 'react'
import { WrapperTab } from './ChannelTab.style'

export default function ChannelPolicie(props) {
    const { data, isLoading } = props
    return (
        <>
        {data?.vendor_policies?.shipping_policy && (
            <WrapperTab>
                <h2 className="wcfm_policies_heading">
                    {data?.vendor_policies?.shipping_policy_heading}
                </h2>
                <div dangerouslySetInnerHTML={{__html:data?.vendor_policies?.shipping_policy}} />
            </WrapperTab>
        )}
        {data?.vendor_policies?.refund_policy && (
            <WrapperTab>
                <h2 className="wcfm_policies_heading">
                    {data?.vendor_policies?.refund_policy_heading}
                </h2>
                <div dangerouslySetInnerHTML={{__html:data?.vendor_policies?.refund_policy}} />
            </WrapperTab>
        )}
        {data?.vendor_policies?.cancellation_policy && (
            <WrapperTab>
                <h2 className="wcfm_policies_heading">
                    {data?.vendor_policies?.cancellation_policy_heading}
                </h2>
                <div dangerouslySetInnerHTML={{__html:data?.vendor_policies?.cancellation_policy}} />
            </WrapperTab>
        )}
        </>
    )
}
