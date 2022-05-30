import { useContext, useState } from 'react';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'reactstrap';

import Link from 'next/link'
import useIcon from '../../hooks/useIcon';
import { ButtonSmall } from "../ui/button/ButtonSmall";
import CarMemberStyle from "../ui/card/CarMemberStyle";
import { css } from '@emotion/core';
import { UserContext } from '../../context/UserContext';


const MemberActionModal = ({ toggleModal, setToggleModal, user }) => {
    const {
        name = "",
        mention_name = "",
        avatar_urls: {
            thumb = "/img/user.png"
        },
        is_following,
        friendship_status,
    } = user;

    return (
        <Modal
            css={css`
            .modal-content{
                background: #101010;
            }
            .close > span:not(.sr-only){
                color: #fff;
            }
            .list-group-item{
                background-color: transparent;
                border-color: #232323;
            }
        `}
            className="modal-dialog-centered"
            isOpen={toggleModal}
            toggle={() => setToggleModal(!toggleModal)}
        >
            <div className="modal-header align-items-center">
                <h5 className="modal-title d-flex" >
                    <div className="modal-avatar mr-3">
                        <img
                            className="avatar"
                            src={thumb}
                            alt={mention_name} />
                    </div>
                    <span
                        className="modal-name d-flex align-items-center">
                        {name}
                    </span>
                </h5>
                <button
                    aria-label="Close"
                    className="close"
                    data-dismiss="modal"
                    type="button"
                    onClick={() => setToggleModal(!toggleModal)}
                >
                    <span aria-hidden={true}>×</span>
                </button>
            </div>
            <div className="modal-body">
                <ul className="list-group list-group-flush">
                    {is_following ? (
                        <li className="list-group-item">
                            Unfollow
                        </li>
                    ) : (
                        <li className="list-group-item">
                            Follow
                        </li>
                    )}

                    {(friendship_status === 'pending') && (
                        <li className="list-group-item">Cancel connection request</li>
                    )}

                    {(friendship_status === 'is_friend') && (
                        <li className="list-group-item">Connected</li>
                    )}

                    {(friendship_status === 'not_friends') && (
                        <li className="list-group-item">Connect</li>
                    )}

                    <li className="list-group-item">Morbi leo risus</li>
                </ul>
            </div>
            <div className="modal-footer">

            </div>
        </Modal>
    )
}


const CardMember = ({ user = "" }) => {

    const { user: currentUser } = useContext(UserContext)

    const { iconElement: ellipsis } = useIcon(faEllipsisV)

    const [toggle, setToggle] = useState(false)

    const {
        name = "",
        mention_name = "",
        avatar_urls: {
            thumb = "/img/user.png"
        },
        id
    } = user;



    return (
        <CarMemberStyle>
            <div className="list-wrap">
                <div className="list-wrap-inner">
                    <figure className="member-avatar-container">
                        <Link href={`profile/${mention_name.toLowerCase()}/${id}`}>
                            <a >
                                <img
                                    style={{
                                        height: 52,
                                        width: 52
                                    }}
                                    src={thumb} className="avatar" />
                            </a>
                        </Link>
                    </figure>
                    <div className="item">
                        <div className="member-card-body">
                            <Link href={`profile/${mention_name.toLowerCase()}/${id}`}>
                                <a>
                                    <h2>{name}</h2>
                                    <h3>@{`${mention_name}`}</h3>
                                </a>
                            </Link>
                        </div>
                        {
                            !currentUser || (currentUser.id !== user.id) && (
                                <div className="member-card-action">
                                    <ButtonSmall className="btn" >
                                        Follow
                                    </ButtonSmall>
                                </div>)
                        }
                        {
                            !currentUser || (currentUser.id !== user.id) && (
                                <button
                                    onClick={() => setToggle(!toggle)}
                                    className="member-card-button-action">
                                    {ellipsis}
                                </button>
                            )

                        }
                    </div>
                </div>
            </div>

            <MemberActionModal
                toggleModal={toggle}
                setToggleModal={setToggle}
                user={user}
            />
        </CarMemberStyle>
    );
}

export default CardMember;
