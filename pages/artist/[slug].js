import React, { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import Head from "next/head";
import { Col } from "reactstrap";

import Layout from "../../components/layout/Layout";
import { getArtistDetails } from "../api/events.api";
import { SectionEvent } from "../../components/ui/section/SectionEvent";
import Loader from "../../components/loader";
import { capitalizeFirstLetter } from '../../utils/capitalLetter'

const ArtistWrapper = () => {
  const [artist, setArtist] = useState(null);
  const router = useRouter();
  const query = router.query;
  const { slug = null } = query;

  const convertToPlain = (html) => {
    if (!document)
      return false
    // Create a new div element
    let tempDivElement = document.createElement("div");
    // Set the HTML content with the given value
    tempDivElement.innerHTML = html;
    // Retrieve the text property of the element 
    return tempDivElement.textContent || tempDivElement.innerText || "";
  }
  useEffect(() => {
    if (slug)
      getArtistDetails(slug).then((res) => {
        setArtist(res.data)
      }).catch(() => { })
  }, [slug])


  return (
    <Layout>
      <Head>
        <title>WeShare | {artist?.title && capitalizeFirstLetter(artist?.title)}</title>
      </Head>
      <Col>
        {!artist ? <div style={{ textAlign: 'center' }}> <Loader /></div> :
          <SectionEvent>
            <header className="channel-header events-main-tag">
              <div className="event-meta-left">
                <div className="event-right-panel">
                  <h1 className="event-title">{capitalizeFirstLetter(artist.title)}</h1>
                </div>
              </div>
              <figure>
                <img
                  className="img-ration"
                  src={
                    artist.images
                      ? artist.images.full
                      : "https://portl.com/wp-content/uploads/2020/08/portl-logo-dark.jpg"
                  }
                  alt={artist.title} />
              </figure>
            </header>
            <footer className="channel-footer events-info-footer ">
              <div className="channel-info">
                {artist.content && convertToPlain(artist.content)}
              </div>
            </footer>
          </SectionEvent>
        }</Col>
    </Layout>
  );
}

export default ArtistWrapper;
