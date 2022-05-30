import moment from 'moment'
import Link from 'next/link';

const ChannelItem = ( { channel } ) => {

    const { 
        name = "",
        user_login = "",
        avatar_urls : {
            thumb = "/img/user.png", 
            full = "/img/user.png"
        },
        last_activity,
        xprofile: {
            groups
        }
    }  = channel;

    const { fields } = groups[8];

    const nameChannel = fields[67]?.value ?  fields[67].value.raw : name;
    const channelImg = fields[100]?.value ?  fields[100].value.raw : full ? full : thumb;
  

    return (
    <div 
    style={{
        borderRadius: 'unset',
    }}
    className="card mb-3">
        <Link href={`/channel/${user_login}`}> 
            <a>                
                <div
                style={{
                    border: '1px solid #eee',
                    borderBottom: 'none' 
                }}
                
                className="ratio ratio-16x9 b-radius-top">
                    <img src={channelImg} alt={`avatar for channel ${nameChannel}`} className="card-img-top"/>
                </div>
            </a>       
        </Link>

        <div
        style={{
            border: '1px solid #eee',
            borderTop: 'none' 
        }}
        className="card-body b-radius-bottom">
            <h5 className="card-title text-center mb-2">
                <Link href={`/channel/${user_login}`}>                
                    <a >
                        {nameChannel}
                    </a>
                </Link>
            </h5>
            <span className="card-subtitle text-muted text-center d-block">
                active {moment(last_activity).endOf('day').fromNow()}
            </span>
        </div>
    </div>);
}
 
export default ChannelItem;