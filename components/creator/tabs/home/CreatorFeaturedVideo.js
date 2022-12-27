import React from 'react'

function CreatorFeaturedVideo({ video, about, setTab }) {

  const formatAbout = `${about ? about?.slice(0, 200) : ''} ...`
  
  return (
    <div className="d-flex row mt-5">

        <div className="col-6">
            <h4 className="section-main-title mb-4 font-weight-bold">
                Featured Video
            </h4>
            <div className="section-main">
                <div className="card-general">
                    <div 
                    style={{
                        backgroundImage: `url(${video})`,
                    }}
                    className="ratio ratio-16x9 bg-gray border-radius-17 cover-bg"
                    >
                    </div>
                </div>
            </div>
        </div>

        <div className="col-6">
            <h4 className="section-main-title mb-4 font-weight-bold">
                About
            </h4>
            {about && (
                <>
                    <div dangerouslySetInnerHTML={{ __html: formatAbout }} />
                    <span className='pointer text-primary' onClick={() => setTab('about')}>more</span>
                </>
            )}
        </div>
    </div>
  );
}

export default CreatorFeaturedVideo;
