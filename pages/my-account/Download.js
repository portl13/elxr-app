import React, { useState, useEffect } from 'react'
import DownloadCard from '@pages/my-account/DownloadCard'
import { getDownload } from '@api/my-account/Download.api'
import { Spinner } from 'reactstrap'
function Download({ user }) {
  const [load, setLoad] = useState(false)
  const [result, setResult] = useState()
  useEffect(() => getDownloadDetail(), [])
  function getDownloadDetail() {
    getDownload(user)
      .then((res) => {
        setResult(res.data.data)
        setLoad(true)
      })
      .catch((error) => console.log(error))
  }
  return (
    <>
      <h3>Downloads</h3>
      <div className="wc-MyAccount-inner-content fl-d">
        {!load && (
          <Spinner
            style={{ width: '1.2rem', height: '1.2rem' }}
            color="primary"
          />
        )}
        {load && result.length !== 0 && <DownloadCard result={result} />}
        <div className="wc-MyAccount-fix-center">
          {load && result.length === 0 && (
            <img src="https://data.portl.live/wp-content/themes/buddyboss-theme/assets/images/svg/cart.svg" />
          )}
          {load && result.length === 0 && (
            <div className="wc-tagline">No downloads available yet.</div>
          )}
        </div>
      </div>
    </>
  )
}
export default Download
