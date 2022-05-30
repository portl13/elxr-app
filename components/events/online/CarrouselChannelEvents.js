import React, { useEffect, useState } from 'react';
import LinesEllipsis from 'react-lines-ellipsis'
import Slider from "react-slick";
import Link from 'next/link'
import { Col, Row } from 'reactstrap';
import MessajeAlert from '../../ui/alert/MessajeAlert';
import HeaderCarrousel from "../helpers/HeaderCarrousel";
import CardEventContainer from '../../ui/card/CardEventContainer';
import { getArtistList } from "../../../pages/api/events.api"
import { capitalizeFirstLetter } from '../../../utils/capitalLetter';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000
};

const CarrouselChannelEvents = ({ category, typeEvent }) => {
    const [artistList, setArtist] = useState([]);
    const noEvent = artistList && artistList?.length === 0;

    useEffect(() => {
        getArtistList({ per_page: 20, page: 1, category: category, status: typeEvent }).then((res) => {
            setArtist(res.data);
        }).catch(() => { })
    }, [category])

    return (
        <>
            {artistList.length ? <>
                <HeaderCarrousel text={`Live ${category} Channels`}
                    link={`/artists`}  hidelink={true}/>
                <Row className="mb-2 event-caroual-section">
                    <Col xs="12">
                        <Slider {...settings}>
                            {artistList.map(item =>
                                <Col key={item.id} xs="12">
                                    <CardEventContainer>
                                        <Link href={`/artist/${item.slug}`}>
                                            <a className="card-link-event">
                                                <div>
                                                    <header className="card-header-event">
                                                        <img
                                                            src={item.images
                                                                ? item.images?.medium
                                                                : "https://portl.com/wp-content/uploads/2020/08/portl-logo-dark.jpg"
                                                            }
                                                            alt={item.title}
                                                            className="image1"
                                                        />
                                                        <img src="/img/video-play.png" className="image2" />
                                                    </header>
                                                    <footer className="card-footer-event remove-padding">
                                                        <h3 className="card-title-event">{capitalizeFirstLetter(item.title)}</h3>
                                                        <LinesEllipsis
                                                            text={item.content}
                                                            maxLine='2'
                                                            className='card-title-event-detail'
                                                            ellipsis='...'
                                                            trimRight
                                                            basedOn='letters'
                                                        />
                                                    </footer>
                                                </div>
                                            </a>
                                        </Link>
                                    </CardEventContainer>
                                </Col>
                            )}

                        </Slider>
                    </Col>
                    {noEvent && <Col className="mb-5" xs="12">
                        <MessajeAlert typeIcon={"heart"} messaje={`We cannot find live ${category} events`}
                            type={"danger"} textAlert={"Sorry!"} /> </Col>}
                </Row>
            </>
                : ""}</>);
}

export default CarrouselChannelEvents;
