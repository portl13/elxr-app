import React, { useState, useEffect, useContext } from 'react'
import { getSubscription } from '@api/my-account/Subscription.api'
import { Spinner } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons'
import SubscriptionCard from '@components/my-purchases/subscriptions/SubscriptionCard'
import { UserContext } from '@context/UserContext'
import { subscriptionsStyle } from '../Subcriptions'

function MySubscriptions() {
  const { user } = useContext(UserContext)
  const [result, setResult] = useState()
  const [load, setLoad] = useState(false)
  function getSubscriptionDetail() {
    getSubscription(user)
      .then((res) => {
        setResult(res.data.data)
        setLoad(true)
      })
      .catch((error) => console.log(error))
  }
  useEffect(() => {
    if (user) {
      getSubscriptionDetail()
    }
  }, [user])
  return (
    <section css={subscriptionsStyle}>
      <h3>Subscriptions</h3>
      <div className="account-subscription-wrapper mt-4">
        <span className="account-subscription-panel fx-d">
          {!load && (
            <Spinner
              style={{ width: '1.2rem', height: '1.2rem' }}
              color="primary"
            />
          )}
          {load && result.length === 0 && (
            <>
              <FontAwesomeIcon icon={faClock} />
              You have no active subscriptions.
            </>
          )}
          {load &&
            result.map((d) => (
              <SubscriptionCard
                key={d.id}
                result={d}
                handleRedirect={() => {}}
              />
            ))}
        </span>
      </div>
    </section>
  )
}

export default MySubscriptions
