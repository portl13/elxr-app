import React from 'react'
import useWcfm from '../../hooks/useWcfm'
import ChannelProduct from './ChannelProduct'
import ChannelProductSkeleton from './SkeletonsChannel/ChannelProductSkeleton'

export default function ChannelProductRelated(props) {

    const { id } = props

    const request = { method: 'GET', params: {} }

    const options = {
        revalidateOnFocus: false,
    }

    const url = `products/${id}`

    const { data, isLoading } = useWcfm(url, request, options)

    return (
        <>
            {data && <ChannelProduct product={data} />}
            {isLoading && <ChannelProductSkeleton />}
        </>
    )
}
