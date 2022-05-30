import React from 'react'
import { WrapperTab } from './ChannelTab.style'

export default function ChannelAbout(props) {
    const { data, isLoading } = props
    return (
        <WrapperTab>
            {data && (
            <div dangerouslySetInnerHTML={{ __html: data?.vendor_description }} />
            )}
        </WrapperTab>
    )
}
