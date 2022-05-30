import React from 'react';
import { Col, Row } from 'reactstrap';
import Carousel from 'react-multi-carousel';
import LinesEllipsis from 'react-lines-ellipsis'
import Link from 'next/link'
import CardEventContainer from '../../ui/card/CardEventContainer';
import { capitalizeFirstLetter } from '../../../utils/capitalLetter'


const CardCarouselWrapper = ({ artistList }) => {
    return (
        <Carousel
            additionalTransfrom={0}
            arrows
            autoPlaySpeed={3000}
            centerMode={false}
            draggable
            focusOnSelect={false}
            itemclassName="col"
            keyBoardControl
            minimumTouchDrag={80}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            responsive={{
                desktop: {
                    breakpoint: {
                        max: 3000,
                        min: 1024
                    },
                    items: 3
                },
                mobile: {
                    breakpoint: {
                        max: 767,
                        min: 0
                    },
                    items: 1
                },
                tablet: {
                    breakpoint: {
                        max: 1023,
                        min: 768
                    },
                    items: 2
                }
            }}
            showDots
            sliderclassName=""
            slidesToSlide={1}
            swipeable
        >{artistList.map(item =>
            <Col key={item.id} xs="12" md="6" lg="4">
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
        </Carousel>
    );
}

export default CardCarouselWrapper;
