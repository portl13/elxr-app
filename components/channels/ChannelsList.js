import useMember from "../../hooks/useMember";
import LooSkeletonCarrusel from '../events/helpers/LooSkeletonCarrusel';
import ChannelItem from './ChannelItem';

const ChannelsList = () => {

    const {
        members: channels,
        isLoadingInitialData,
    } = useMember('all', 'channel');


    return (
        <div className="row">
            {isLoadingInitialData && (

                <LooSkeletonCarrusel numberCard={10} />

            )}

            {channels.map(channel => (
                <div
                    className="col-12 col-md-6 col-lg-4"
                    key={channel.id}>
                    <ChannelItem channel={channel} />
                </div>
            ))}
        </div>
    );
}

export default ChannelsList;
