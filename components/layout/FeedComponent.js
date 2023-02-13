import styled from '@emotion/styled'
import { faComments, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'reactstrap';
import useIcon from '../../hooks/useIcon';

const FeedComponentStyle = styled.article`
    header{
        display: flex;
        padding: 1rem 0;
    }
    .avatar-livefeed-container{margin-right: 15px;}
    .posted{
        display: block;
    }
    footer{
        display: flex;
        justify-content: space-between;
        padding: 1rem 0;
    }
    button{
        background-color: transparent;
        color: #eee;
        border:none;
        &:hover{
            background-color: transparent;
        }
    }
`

const FeedComponent = ({ url }) => {

    const avatar = `${process.env.baseUrl}/wp-content/uploads/2020/11/avatar.jpg`;

    const { iconElement: comment } = useIcon(faComments)
    const { iconElement: up } = useIcon(faArrowUp)
    const { iconElement: down } = useIcon(faArrowDown)

    return (
        <FeedComponentStyle>
            <header>
                <div className="avatar-livefeed-container">
                    <img className="avatar" src={avatar} alt="avatar" />
                </div>
                <div className="header-livefeed-container">
                    <b className="username">Jeluiho</b> <span className="livefeed-action">posted a Video</span>
                    <span className="posted">9:41 am</span>
                </div>
            </header>
            <div className="body-livefeed">
                <img src={url} alt="video" />
            </div>
            <footer>
                <span className="vote">
                    <Button>
                        <span className="btn-inner--icon">
                            <i>{up}</i>
                        </span>
                    </Button>
                    <span>Vote</span>
                    <Button>
                        <span className="btn-inner--icon">
                            <i>{down}</i>
                        </span>
                    </Button>
                </span>
                <Button className="btn-icon btn-2" type="button">
                    <span className="btn-inner--icon">
                        <i>{comment}</i>
                    </span>
                    <span className="btn-inner--text">Comment</span>
                </Button>
            </footer>
        </FeedComponentStyle>
    );
}

export default FeedComponent;
