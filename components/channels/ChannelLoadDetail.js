import { TitleSkeleton } from "../profile/profile-skeleton";
import { SectionChannel } from "../ui/section/SectionChannel";

const ChannelLoadDetail = () => {
    return (
        <SectionChannel>
            <header className="channel-header">
                <figure className="ratio ratio-16x9 b-radius">
                    <TitleSkeleton height={500} />
                </figure>
                <div className="event-meta">
                    <h1 className="channel-title"><TitleSkeleton height={25} width={280} /></h1>
                    <span className="channel-action">
                    </span>
                </div>
            </header>
            <footer className="channel-footer">

                <div className="channel-artist">

                </div>
                <div className="channel-description">
                </div>
            </footer>
        </SectionChannel>
    );
}

export default ChannelLoadDetail;
