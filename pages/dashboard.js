import React, {useContext, useState, useRef, useEffect} from 'react'
import LayoutSignUp from '../components/signup/LayoutSignUp'
import Head from 'next/head'
import {Row, Col, FormGroup, Label, Input} from 'reactstrap'
import {css} from '@emotion/core'
import {UserContext} from '../context/UserContext'
import Axios from 'axios'

const cssMedia = css`
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;

  .avatar {
    height: 80px;
    width: 80px;
    margin-right: 25px;
  }

  h1 {
    font-size: 30px;
    text-transform: uppercase;
    margin-bottom: 0;
  }
`
const cssContainer = css`
  background: #161c32;
  border-radius: 20px;
  padding: 1.2rem;
  margin-bottom: 22px;

  h2 {
    font-size: 20px;
  }

  Label {
    color: #cccccc;
  }

  .form-input {
    background-color: #2f3858;
    border-radius: 7px;
    border-color: #2f3858;
    color: #fff;
  }

  .form-text {
    color: #ccc;
    font-size: 12px;
  }

  textarea {
    min-height: 90px;
  }

  .custom-toggle input:checked + .custom-toggle-slider:before {
    background: #fff;
    -webkit-transform: translateX(1.625rem);
    transform: translateX(1.625rem);
  }

  .custom-toggle input:checked + .custom-toggle-slider {
    border: 1px solid #eb1e79;
    background-color: #eb1e79;
  }

  .custom-toggle {
    min-width: 50px;
  }

  .form-image {
    min-height: 160px;
    background-color: #2f3858;
    border-radius: 7px;
  }

  .file-image {
    width: 100%;
    cursor: pointer;
    opacity: 0;
  }

  .btn {
    padding: 0.3rem 0.8rem;
  }
`

const url = 'https://data.portl.live/wp-json/wcfmmp/v1/settings/id/'


export default function DashboardPage() {
    const {user} = useContext(UserContext)
    const isMounted = useRef(true)

    const [channel, setChannel] = useState({
        store_name: '',
        social: {
            twitter: '',
            fb: '',
            instagram: '',
            youtube: '',
            linkedin: '',
            gplus: '',
            snapchat: '',
            pinterest: '',
        },
        phone: '',
        location: '',
        find_address: '',
        banner: '',
        customer_support: {
            phone: '',
            email: '',
            address1: '',
            address2: '',
            country: '',
            city: '',
            state: '',
            zip: '',
        },
        vendor_id: '',
        wcfm_shipping_policy: '',
        wcfm_refund_policy: '',
        wcfm_cancellation_policy: '',
        store_slug: '',
        store_email: '',
        gravatar: '',
        banner_type: '',
        banner_video: '',
        banner_slider: [
            {
                image: '',
                link: '',
            },
        ],
        mobile_banner: '',
        list_banner_type: '',
        list_banner: '',
        list_banner_video: '',
        shop_description: '',
    })

    const [config, setConfig] = useState({
        allow_guest_chat: false,
        show_reaction_count: false,
        show_total_viewer_count: false,
        show_tips_button: false,
        show_active_viewer_count: false,
        show_book_button: false,
        show_live_audience: false,
        enable_collaboration_mode: false,
    })

    const [channelDetails, setChannelDetails] = useState({
        rules: '',
        faq: '',
        details: ''
    })

    const source = Axios.CancelToken.source()

    const getChannel = async () => {
        try {
            if (isMounted) {
                const {data} = await Axios.get(`${url}${user.id}`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                    cancelToken: source.token,
                })
                setChannel((prev) => ({...prev, ...data}))
            }
        } catch (e) {
            if (isMounted) {
                if (Axios.isCancel(e)) {
                } else {
                    if (e.response) {
                    }
                }
            }
        }
    }
    const getConfig = async () => {
        try {
            if (isMounted) {
                const {data} = await Axios.get('/api/channels/config?id=' + user.id, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                    cancelToken: source.token,
                })

                if (data.success) {
                    setConfig((prev) => ({...prev, ...data.data}))
                }
            }
        } catch (e) {
            if (isMounted) {
                if (Axios.isCancel(e)) {
                } else {
                    if (e.response) {
                    }
                }
            }
        }
    }
    const getDetails = async () => {
        try {
            if (isMounted) {
                const {data} = await Axios.get('/api/channels/get-details?id=' + user.id, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                    cancelToken: source.token,
                })

                if (data.success) {
                    setChannelDetails((prev) => ({...prev, ...data.data}))
                }
            }
        } catch (e) {
            if (isMounted) {
                if (Axios.isCancel(e)) {
                } else {
                    if (e.response) {
                    }
                }
            }
        }
    }

    const saveConfig = async () => {
        try {
            if (isMounted) {
                const {data} = await Axios.post(
                    '/api/channels/save-config?id=' + user.id,
                    {config},
                    {
                        headers: {
                            Authorization: `Bearer ${user.token}`,
                        },
                        cancelToken: source.token,
                    }
                )
                if (data.success) {
                    setConfig(prev => ({...prev, ...data.result}))
                }
            }
        } catch (e) {
            if (isMounted) {
                if (Axios.isCancel(e)) {
                } else {
                    if (e.response) {
                    }
                }
            }
        }
    }
    const saveChannelDetails = async () => {
        try {
            if (isMounted) {
                const {data} = await Axios.post(
                    '/api/channels/details?id=' + user.id,
                    {data: channelDetails},
                    {
                        headers: {
                            Authorization: `Bearer ${user.token}`,
                        },
                        cancelToken: source.token,
                    }
                )
                if (data.success) {
                    setChannelDetails(prev => ({...prev, ...data.result}))
                }
            }
        } catch (e) {
            if (isMounted) {
                if (Axios.isCancel(e)) {
                } else {
                    if (e.response) {
                    }
                }
            }
        }
    }
    const updateChannel = async () => {
        try {
            if (isMounted) {
                const {data} = await Axios.post(
                    '/api/channels/update-channel?id=' + user.id,
                    {data: channel},
                    {
                        headers: {
                            Authorization: `Bearer ${user.token}`,
                        },
                        cancelToken: source.token,
                    }
                )
                if (data.success) {
                    setChannel(prev => ({...prev, ...data.data}))
                }
            }
        } catch (e) {
            if (isMounted) {
                if (Axios.isCancel(e)) {
                } else {
                    if (e.response) {
                    }
                }
            }
        }
    }

    const handleDetails = ({name, value}) => {
        setChannelDetails({
            ...channelDetails,
            [name]: value,
        })
    }

    const handlerChannelSocial = ({name, value})=>{
        setChannel({
            ...channel,
            social:{
                ...channel.social,
                [name]: value
            }
        })
    }

    useEffect(() => {
        if (user) {
            getChannel()
            getConfig()
            getDetails()
        }
    }, [user])

    useEffect(() => {
        return () => {
            isMounted.current = false
            source.cancel()
        }
    }, [])

    return (
        <>
            <Head>
                <title>Dashboard</title>
            </Head>
            <LayoutSignUp>
                <Row>
                    <Col css={cssMedia} className="media-channel d-flex" xs={12}>
                        <div className="avatar">
                            {user && (
                                <img src={user.avatar_urls.thumb} alt={user.displayName}/>
                            )}
                        </div>
                        <div className="content">
                            <h1>{user?.displayName}</h1>
                            <span className="d-block">Music / Creative 1.7K Followers</span>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={6}>
                        <div css={cssContainer}>
                            <h2>Channel Configuration</h2>
                            <Row>
                                <Col className="mb-2" xs={6}>
                                    <div className="d-flex">
                                        <label className="custom-toggle mr-3">
                                            <input
                                                type="checkbox"
                                                onChange={() =>
                                                    setConfig({
                                                        ...config,
                                                        allow_guest_chat: !config.allow_guest_chat,
                                                    })
                                                }
                                                checked={config.allow_guest_chat}
                                            />
                                            <span className="custom-toggle-slider rounded-circle"></span>
                                        </label>
                                        <span>Allow Guest Chat</span>
                                    </div>
                                </Col>
                                <Col className="mb-2" xs={6}>
                                    <div className="d-flex">
                                        <label className="custom-toggle mr-3">
                                            <input
                                                type="checkbox"
                                                onChange={() =>
                                                    setConfig({
                                                        ...config,
                                                        show_reaction_count: !config.show_reaction_count,
                                                    })
                                                }
                                                checked={config.show_reaction_count}
                                            />
                                            <span className="custom-toggle-slider rounded-circle"></span>
                                        </label>
                                        <span>Show Reaction Count</span>
                                    </div>
                                </Col>
                                <Col className="mb-2" xs={6}>
                                    <div className="d-flex">
                                        <label className="custom-toggle mr-3">
                                            <input
                                                type="checkbox"
                                                onChange={() =>
                                                    setConfig({
                                                        ...config,
                                                        show_total_viewer_count:
                                                            !config.show_total_viewer_count,
                                                    })
                                                }
                                                checked={config.show_total_viewer_count}
                                            />
                                            <span className="custom-toggle-slider rounded-circle"></span>
                                        </label>
                                        <span>Show Total Viewer Count</span>
                                    </div>
                                </Col>
                                <Col className="mb-2" xs={6}>
                                    <div className="d-flex">
                                        <label className="custom-toggle mr-3">
                                            <input
                                                type="checkbox"
                                                onChange={() =>
                                                    setConfig({
                                                        ...config,
                                                        show_tips_button: !config.show_tips_button,
                                                    })
                                                }
                                                checked={config.show_tips_button}
                                            />
                                            <span className="custom-toggle-slider rounded-circle"></span>
                                        </label>
                                        <span>Show Tips Button</span>
                                    </div>
                                </Col>
                                <Col className="mb-2" xs={6}>
                                    <div className="d-flex">
                                        <label className="custom-toggle mr-3">
                                            <input
                                                type="checkbox"
                                                onChange={() =>
                                                    setConfig({
                                                        ...config,
                                                        show_active_viewer_count:
                                                            !config.show_active_viewer_count,
                                                    })
                                                }
                                                checked={config.show_active_viewer_count}
                                            />
                                            <span className="custom-toggle-slider rounded-circle"></span>
                                        </label>
                                        <span>Show Active Viewer Count</span>
                                    </div>
                                </Col>
                                <Col className="mb-2" xs={6}>
                                    <div className="d-flex">
                                        <label className="custom-toggle mr-3">
                                            <input
                                                type="checkbox"
                                                onChange={() =>
                                                    setConfig({
                                                        ...config,
                                                        show_book_button: !config.show_book_button,
                                                    })
                                                }
                                                checked={config.show_book_button}
                                            />
                                            <span className="custom-toggle-slider rounded-circle"></span>
                                        </label>
                                        <span>Show Book Button</span>
                                    </div>
                                </Col>
                                <Col className="mb-2" xs={6}>
                                    <div className="d-flex">
                                        <label className="custom-toggle mr-3">
                                            <input
                                                type="checkbox"
                                                onChange={() =>
                                                    setConfig({
                                                        ...config,
                                                        show_live_audience: !config.show_live_audience,
                                                    })
                                                }
                                                checked={config.show_live_audience}
                                            />
                                            <span className="custom-toggle-slider rounded-circle"></span>
                                        </label>
                                        <span>Show Live Audience</span>
                                    </div>
                                </Col>
                                <Col className="mb-2" xs={6}>
                                    <div className="d-flex">
                                        <label className="custom-toggle mr-3">
                                            <input
                                                type="checkbox"
                                                onChange={() =>
                                                    setConfig({
                                                        ...config,
                                                        enable_collaboration_mode:
                                                            !config.enable_collaboration_mode,
                                                    })
                                                }
                                                checked={config.enable_collaboration_mode}
                                            />
                                            <span className="custom-toggle-slider rounded-circle"></span>
                                        </label>
                                        <span>Enable Collaboration Mode</span>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="justify-content-end">
                                <Col xs='auto'>
                                    <button className="btn btn-primary" onClick={() => saveConfig()}>
                                        Save
                                    </button>
                                </Col>
                            </Row>
                        </div>
                        <div css={cssContainer}>
                            <h2>Bio</h2>
                            <form>
                                <FormGroup>
                                    <Label for="aboutMe">About Me</Label>
                                    <Input
                                        className="form-input form-control"
                                        id="aboutMe"
                                        name="aboutMe"
                                        type="textarea"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="image">Upload a Channel Image</Label>
                                    <div className="form-image d-flex w-100">
                                        <input type="file" className="file-image"/>
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="price">Subscription Price</Label>
                                    <Input
                                        className="form-input"
                                        id="price"
                                        name="price"
                                        type="text"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="category">Channel Category</Label>
                                    <Input
                                        className="form-input"
                                        id="category"
                                        name="category"
                                        type="text"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="tags">Channel Tags</Label>
                                    <Input
                                        className="form-input"
                                        id="tags"
                                        name="tags"
                                        type="text"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="goLive">Channel Go Live Message</Label>
                                    <Input
                                        className="form-input form-control"
                                        id="goLive"
                                        name="goLive"
                                        type="textarea"
                                    />
                                </FormGroup>
                            </form>
                        </div>
                    </Col>
                    <Col xs={12} md={6}>
                        <div css={cssContainer}>
                            <h2>Socials</h2>
                            <div>
                                <FormGroup>
                                    <Label for="fb">Facebook Profile URL</Label>
                                    <Input
                                        className="form-input"
                                        id="fb"
                                        name="fb"
                                        type="text"
                                        value={channel.social.fb}
                                        onChange={(value) => handlerChannelSocial(value.target)}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="twitter">Twitter Profile URL</Label>
                                    <Input
                                        className="form-input"
                                        id="twitter"
                                        name="twitter"
                                        type="text"
                                        value={channel.social.twitter}
                                        onChange={(value) => handlerChannelSocial(value.target)}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="instagram">Instagram Profile URL</Label>
                                    <Input
                                        className="form-input"
                                        id="instagram"
                                        name="instagram"
                                        type="text"
                                        value={channel.social.instagram}
                                        onChange={(value) => handlerChannelSocial(value.target)}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="linkedin">Twitch Profile URL</Label>
                                    <Input
                                        className="form-input"
                                        id="linkedin"
                                        name="linkedin"
                                        type="text"
                                        value={channel.social.linkedin}
                                        onChange={(value) => handlerChannelSocial(value.target)}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="youtube">Youtube Profile URL</Label>
                                    <Input
                                        className="form-input"
                                        id="youtube"
                                        name="youtube"
                                        type="text"
                                        value={channel.social.youtube}
                                        onChange={(value) => handlerChannelSocial(value.target)}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="gplus">Official Website</Label>
                                    <Input
                                        className="form-input"
                                        id="gplus"
                                        name="gplus"
                                        type="text"
                                        value={channel.social.gplus}
                                        onChange={(value) => handlerChannelSocial(value.target)}
                                    />
                                </FormGroup>
                                <Row className="justify-content-end">
                                    <Col xs="auto">
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => updateChannel()}
                                        >
                                            Save
                                        </button>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                        <div css={cssContainer}>
                            <h2>Details</h2>
                            <div>
                                <FormGroup>
                                    <Label for="rules">Channel Rules</Label>
                                    <Input
                                        className="form-input"
                                        id="rules"
                                        name="rules"
                                        type="textarea"
                                        value={channelDetails.rules}
                                        onChange={(value) => handleDetails(value.target)}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="faq">Channel FAQ</Label>
                                    <Input
                                        className="form-input"
                                        id="faq"
                                        name="faq"
                                        type="textarea"
                                        value={channelDetails.faq}
                                        onChange={(value) => handleDetails(value.target)}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="details">Channel Contact Details</Label>
                                    <Input
                                        className="form-input form-control"
                                        id="details"
                                        name="details"
                                        type="textarea"
                                        value={channelDetails.details}
                                        onChange={(value) => handleDetails(value.target)}
                                    />
                                </FormGroup>
                            </div>
                            <Row className="justify-content-end">
                                <Col xs="auto">
                                    <button className="btn btn-primary"
                                            onClick={() => saveChannelDetails()}
                                    >Save
                                    </button>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </LayoutSignUp>
        </>
    )
}
