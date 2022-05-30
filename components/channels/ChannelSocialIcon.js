import styled from '@emotion/styled'

const Anchor = styled.a`
    background: white;
    border: 2px solid black;
    height: 30px;
    width: 30px;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 0px 0px 2px rgba(255,255,255,1);
    position: relative;
    text-transform: uppercase;
    will-change: transform;
    letter-spacing: 0.025em;
    font-size: 0.875rem;
    border-radius: 5px;
    cursor: pointer;

    i{
        color: black;
        font-size: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

`

const ChannelSocialIcon = ({ icon, link = "/" }) => {
    return (
        <Anchor
            rel="nofollow noopener"
            target="_blank"
            className="btn-icon btn-2"
            href={link}
        >
            <span className="btn-inner--icon">
                <i >{icon}</i>
            </span>
        </Anchor>
    );
}

export default ChannelSocialIcon;
