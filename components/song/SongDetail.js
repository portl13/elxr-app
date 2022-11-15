import SongAuthorCard from "@components/main/card/SongAuthorCard";
import SongDetailCard from "@components/main/card/SongDetailCard";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import { getFetchPublic } from "@request/creator";
import React, { useRef, useState } from "react";
import useSWR from "swr";
import SongPlayer from "./SongPlayer";
import SongsRelated from "./SongsRelated";

const baseUrl = process.env.apiV2;
const url = `${baseUrl}/song`;

function SongDetail({ id }) {
  const audioRef = useRef();
  const { data: song, error } = useSWR(`${url}/${id}`, getFetchPublic);
  const [play, setPlay] = useState(false);
  const isLoading = !song && !error;

  const playMusic = () => {
    setPlay(!play);
    const music = play ? audioRef.current.pause() : audioRef.current.play();
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12  col-xl-10">
          {isLoading ?
          <SpinnerLoader />:
          <SongDetailCard
          playMusic={playMusic} 
          audioRef={audioRef} 
          play={play} 
          setPlay={setPlay}  
          song={song} 
          />}

          {song ? <SongPlayer playMusic={playMusic} audioRef={audioRef} play={play} setPlay={setPlay} song={song} /> : null}
          <div className="width-300 pt-5">
            <h5 className="text-primary font-weight-bold">Lyrics</h5>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
              nemo dolore fugit nobis nihil facere hic voluptates vel
              consectetur amet eius debitis, <br /> optio saepe officiis
              delectus dolor eos. Voluptas, unde.lor Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Totam, ad! Perspiciatis nihil saepe
              eaque eum consequatur vero modi <br /> eius blanditiis expedita!
              Ipsam aliquam accusantium laboriosam eius, alias veritatis
              corrupti aperiam! Lorem ipsum dolor sit <br /> amet consectetur
              adipisicing elit. Dignissimos ipsa ducimus quibusdam rem culpa quo
              vel corporis, animi eaque placeat reprehenderit <br /> optio
              veniam beatae sint aliquid molestias, illo similique voluptatibus?
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex
              blanditiis culpa
            </p>
          </div>
          {song && song.author && (
            <SongAuthorCard author={song.author} song={song} />
          )}
        </div>

        <div className="col-12  col-xl-2">
          <div className="relative-items mt-4 mt-md-0">
            <h4 className="text-center text-capitazice">More like this</h4>
            {song && <SongsRelated category={song?.category_id} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SongDetail;
