import ChannelCardAudio from '@components/dashboard/channels/ChannelCardAudio';
import SpinnerLoader from '@components/shared/loader/SpinnerLoader';
import { getCreator } from '@request/creator';
import React from 'react'
import useSWR from 'swr';


const podcastslUrl = `${process.env.apiV2}/podcasts?author=`;

function CreatorPodcasts({creator_id}) {
    const { data: audios, error } = useSWR(`${podcastslUrl}${creator_id}&page=1&per_page=4`, getCreator);
    const isLoading = !audios && !error
    const mutateAudiosEdit = () => {}
    const mutateAudios = () => {}


  return (
    
        <div className="row mt-5">
            <div className="col-12">
                <h4 className='font-size-14'>PODCASTS</h4>
            </div>
          {isLoading && <SpinnerLoader />}
          {audios &&
            audios.audios &&
            audios.audios.length > 0 &&
            audios.audios.map((audio) => (
              <ChannelCardAudio
                channel_id={audio.channel_id}
                token={token}
                mutateAudiosEdit={mutateAudiosEdit}
                mutateAudios={mutateAudios}
                audio={audio}
                key={audio.id}
              />
            ))}
          {audios && audios.audios && audios.audios.length === 0 && (
            <h3 className="col display-4">
              You have not created any podcasts yet
            </h3>
          )}
        </div>
    
  )
}

export default CreatorPodcasts