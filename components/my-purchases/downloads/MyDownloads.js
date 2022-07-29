import React, { useState, useEffect, useContext } from 'react'
import DownloadCard from '@components/my-purchases/DownloadCard'
import { getDownload } from '@api/my-account/Download.api'
import { Spinner } from 'reactstrap'
import { UserContext } from '@context/UserContext'

function MyDownloads() {
  const { user } = useContext(UserContext)
  const [load, setLoad] = useState(false)
  const [result, setResult] = useState()

  function getDownloadDetail() {
    getDownload(user)
      .then((res) => {
        setResult(res.data.data)
        setLoad(true)
      })
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    if (user) {
      getDownloadDetail()
    }
  }, [user])

  return (
    <>
      <h3>Downloads</h3>
      <div className="wc-MyAccount-inner-content fl-d pt-1">
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

export default MyDownloads
