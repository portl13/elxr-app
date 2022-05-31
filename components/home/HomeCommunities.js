import React from 'react';
import useSWR from 'swr';
import axios from 'axios';
import Slider from "react-slick";
import Link from "next/link";
import { removeSpecailChar } from '../../utils/constant';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "@emotion/styled"
import HeaderCarrousel from '../events/helpers/HeaderCarrousel';
import { stringToSlug } from '../../lib/stringToSlug';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

const GroupContainer = styled.div`
  margin-bottom: 20px;
  .groups-list{
    margin-bottom: 20px;
    box-sizing: border-box;
    clear: both;
    list-style: none;
    padding: 0;
    width: 100%;
    &.grid{
      width: auto;
      &.small-list{

      }
      .only-list-view {
        display: none!important;
      }
      .footer-button-wrap,
      .last-activity{
        display: none;
      }
      li{
        flex: 0 0 100%;
        max-width: 100%;
        margin: 0 0 20px;
        padding: 0 5px;
        min-width: 0;
        float: left;
      }
      .list-wrap{
        height: 100%;
        flex-direction: column;
        padding: 15px 20px;
      }
      .item-avatar {
        margin-bottom: 20px;
        text-align: left;
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        z-index: 1;
        margin: 0 0 20px;
        .group-avatar-wrap {
          margin-top: -47px;
        }
        img {
          max-width: 75px;
          width: 100%;
        }
      }
      .groups-loop-buttons {
        min-width: 1px;
        flex: 1;
        margin-left: 10px;
      }
      .generic-button {
        text-align: right;
      }
      .group-button {
        line-height: 1.3;
        padding: 0;
        border: 0;
        border-radius: 0;
        min-width: 1px;
        width: auto;
        background: 0 0;
        margin: 5px 0 5px auto;
        font-size: 14px;
        color: var(--primary-color);
        outline: 0;
        transition: all linear .2s;
      }
      .action{
        justify-content: flex-end;
      }
      .item{
        width: 100%;
        flex-flow: column;
        .item-block {
          margin-bottom: 10px;
        }
        .groups-title{
          cursor:pointer;
          margin-bottom: 10px;
          cursor:pointer;
        }
      }
    }
    &:not(.grid) .only-grid-view{
      display: none!important;
    }
    li{
      list-style-type: none;
      margin: 0;
      padding: 0;
      position: relative;
      &:before,
      &:after{
        content: " ";
        display: table;
      }
      .list-wrap{
        display: flex;
        margin: 0 0 -1px;
        overflow: visible;
        padding: 15px 0;
        position: relative;
        transition: box-shadow linear .2s;
      }
      .bs-group-cover {
        overflow: hidden;
        margin: -15px -20px 5px;
        position: relative;

        a{
          border-radius: 3px 3px 0 0;
          position: relative;
          overflow: hidden;
          padding-top: 52.56%;
          display: block;
          background: #809ab4;
          &::before {
            background: rgba(0,0,0,.25);
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
          }
        }
        img {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto;
          z-index: 0;
          min-height: 100%;
          width: auto;
          min-width: 100%;
          object-fit: cover;
          vertical-align: bottom;
          height: auto;
          max-width: 100%;
        }
      }
    }
    .item-avatar{
      margin-right: 20px;
      width: auto;
      a{
        display: inline-block;
        background: #fff;
        border: 3px solid #fff;
        box-shadow: 0 2px 5px 0 rgb(18 43 70 / 12%), 0 0 0 1px #e7e9ec;
        border-radius: 3px;
      }
      img{
        max-width: 75px;
        height: auto;
        width: 100%;
      }
    }
    .avatar{
      border-radius: 3px;
    }
    .group-avatar-wrap{
      min-height: 81px;
      min-width: 81px;
    }
    .item{
      flex: 1;
      display: flex;
      flex-flow: row wrap;
      margin: 0;
      .item-block{
        flex: 0 0 28%;
        padding-right: 15px;
        margin-right: 0;
        width: auto;
      }
      .groups-title{
        cursor:pointer;
        font-size: 26px;
        font-weight: 400;
        line-height: 1.1;
        margin: 0 auto 5px;
        .education-platform-home-link{
          width: 100%;
          overflow-wrap: break-word;
          word-wrap: break-word;
          color: var(--typo);
          display: inline-block;
          font-size: 20px;
          font-weight: 500;
          letter-spacing: -.24px;
          line-height: 1.2;
          &:hover{
            color: var(--primary-color);
          }
        }
      }
      .group-details{
        color: #A3A5A9;
        font-size: 13px;
        font-weight: 400;
        line-height: 1.6;
        margin-bottom: 0;
      }
      .last-activity{
        margin: 0;
        letter-spacing: -.24px;
        line-height: 1.3;
      }
    }
    .group-item-desc{
      align-self: center;
      flex: 1;
      font-size: 14px;
      line-height: 1.4;
      padding-right: 20px;
    }
    .more-link{
      font-size: 14px;
      line-height: 1.4;
      color: #ffffff;
      display: inline-flex;
      align-items: center;
      margin-left: 5px;
      transition: all .15s ease;
      &:hover{
        color: var(--primary-color);
        svg{
          margin-left: 10px;
          color: var(--primary-color);
        }
      }
      svg{
        width: 7px;
        display: inline-block;
        margin-left: 5px;
        
      }
    }
    .groups-loop-buttons{
      align-self: center;
      min-width: 140px;
    }
    .action{
      display: flex;
      align-items: center;
      flex-flow: row wrap;
      margin: 0;
    }
    .generic-button{
      margin-bottom: 5px;
    }
    .group-button{
      min-width: 170px;
      color: var(--typo);
      font-size: 13px;
      font-weight: 500;
      min-height: 32px;
      line-height: 32px;
      padding: 0 20px;
      border: 1px solid var(--typo);
      margin: 5px 0;
      box-shadow: none;
      background: #000;
      border-radius: 100px;
      outline: 0;
      letter-spacing: -.24px;
    }
    .group-members-wrap{
      &.only-grid-view{
        font-size: 12px;
        color: #A3A5A9;
        letter-spacing: -.24px;
        margin-bottom: 2px;
        text-align: left;
        .bs-group-members{
          display: inline-block;
          margin-right: 12px;
          img {
            border: 1px solid #fff;
            max-width: 24px;
            display: inline-block;
            margin-right: -8px;
            position: relative;
            z-index: 3;
            border-radius: 50%;
            &:nth-of-type(2) {
              z-index: 2;
            }
            &:nth-of-type(3) {
              z-index: 1;
            }
          }
        }
      }
    }
  }
`

const fetcher = url => axios.get(url).then(({data}) => data)

const getCommunitiesHome = () => {
    const url = `${process.env.bossApi}/groups?include=20,21,22,309&per_page=4`

    const { data, error } = useSWR(url, fetcher, {
        revalidateOnFocus: false,
    })

    let loading = !data && !error

    return {
        data,
        error,
        loading
    }
}

const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ]
};

const HomeCommunities = () => {
    const {user} = useContext(UserContext)

    const { data, error } = getCommunitiesHome();

    const communityLink = (user, name, id) => {
      return !user ? '/signup' : `/group/${stringToSlug(name)}/${id}?tab=feeds`;
    }

    return (
      <>
        <HeaderCarrousel
            text={'Featured Communities'}
            link={ `/communities-details/`}
            hidelink={true}
        />
        <GroupContainer >
            <div className="groups-list small-list grid">
                <Slider {...settings}>
                    {data && data.map(group => (
                        <li key={group.id} className="item-entry group-has-avatar">
                            <div className="list-wrap">
                            <div className="bs-group-cover only-grid-view">
                                <Link
                                href={communityLink(user, group.name, group.id)}
                                >
                                    <a>
                                        <img src={group.cover_url} />
                                    </a>
                                </Link>
                            </div>
                            <div className="item-avatar">
                                <Link
                                href={communityLink(user, group.name, group.id)}
                                >
                                <a className="group-avatar-wrap">
                                    <img src={group?.avatar_urls?.full} className="avatar avatar-300" />
                                </a>
                                </Link>
                                <div className="groups-loop-buttons only-grid-view">
                                <div className="action">
                                    <div id="" className="generic-button">
                                    {/* <button
                                        data-title="Leave group"
                                        data-title-displayed="You're an Organizer"
                                        className="group-button button"
                                        onClick={() => setRole()}
                                    >
                                        {getRole()}
                                    </button> */}
                                    <button css={{visibility: 'hidden'}} className="group-button button">
                                        hola
                                    </button>
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="item-block">
                                <h2 className="groups-title">
                                    <Link
                                    href={communityLink(user, group.name, group.id)}
                                    >
                                    <a className="education-platform-home-link">{group.name}</a>
                                    </Link>
                                </h2>
                                <p className="group-details only-list-view">
                                    {group.status.charAt(0).toUpperCase() + group.status.slice(1)} /{" "}
                                    {group.group_type_label} / {group.members_count}
                                    {group.members_count === 1 ? "member" : "members"}
                                </p>
                                <p className="group-details only-grid-view">
                                    <span className="group-visibility public">
                                    {group.status.charAt(0).toUpperCase() + group.status.slice(1)}
                                    <span className="type-separator">/</span>
                                    <span className="group-type">{group.group_type_label}</span>
                                    </span>
                                </p>
                                <p className="group-details last-activity">
                                    active 2 weeks, 5 days ago
                                </p>
                                </div>
                                <div className="group-item-desc only-list-view">
                                <p>
                                    {group.description.raw.length >= 118
                                    ? group.description.raw.slice(0, 120)
                                    : group.description.raw}
                                    {group.description.raw.length >= 118 ? (
                                    <a href="#" className="more-link">
                                        More <FontAwesomeIcon icon={faAngleRight} />
                                    </a>
                                    ) : null}
                                </p>
                                </div>
                                <div className="groups-loop-buttons footer-button-wrap">
                                <div className="action">
                                    <div id="" className="generic-button">
                                    {/* <button
                                        className="group-button"
                                        data-title="Leave group"
                                        data-title-displayed="You're an Organizer"
                                        onClick={() => setRole()}
                                    >
                                        {getRole()}
                                    </button> */}
                                    </div>
                                </div>
                                </div>
                                <div className="group-members-wrap only-grid-view">
                                {/* <span className="bs-group-members">
                                    {result && (
                                    <img src={creatorImage} alt={creatorName} className="round" />
                                    )}
                                </span> */}
                                {group.members_count >= 2 ? (
                                    <span className="members">
                                    <span className="members-count-g">
                                        +{group.members_count - 1}
                                    </span>
                                    members
                                    </span>
                                ) : null}
                                </div>
                            </div>
                            </div>
                        </li>
                    ))}
                </Slider>
            </div>
        </GroupContainer>
      </>
    )
}

export default HomeCommunities