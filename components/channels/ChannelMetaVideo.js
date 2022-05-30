import { css } from "@emotion/core";


const metaStyle = css`
    .channel-avatar{
        margin-right: 20px;
    }
    .channel-title{
        font-size: 20px;
        margin: 0;
    }
    .channel-body{
        flex: 1 0 auto;
    }
    .channel-meta-title{
        display: inline-block;
        margin-right: 15px;
        font-size: 13px;
    }
    .btn-secondary{
        background-color: var(--secondary-color);
        border-color: var(--secondary-color);
    }
    .btn-secondary:not(:disabled):not(.disabled):active{
        color: #fff;
        background-color: var(--secondary-color);
        border-color: var(--secondary-color);
    }
`

const ChannelMetaVideo = ({ data }) => {

    return (
        <div css={ metaStyle } className="d-flex">
            <div className="channel-avatar">
                {data?.channel_image?.raw ?
                    <img className="avatar" src={data?.channel_image?.raw} alt="s" />
                    : ''
                }
            </div>
            <div className="channel-body">
                <h1 className="channel-title">{ data?.channel_name?.raw ? data?.channel_name?.raw : '' }</h1>
                <span className="channel-meta-title">
                    {
                        data?.channel_category?.raw ?
                        data?.channel_category?.raw :
                        ''
                    }
                </span>
                { data?.followers ? <span className="channel-meta-title">{data?.followers} Followers</span> : '' }
            </div>
            <div className="d-flex align-items-center">
                <button className="btn btn-secondary btn-sm">Give a Tip</button>
                <button className="btn btn-secondary btn-sm">Follow</button>
                <button className="btn btn-primary btn-sm">Subscribe</button>
            </div>
        </div>
    );
}

export default ChannelMetaVideo;