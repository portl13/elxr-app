const SuccessPayment = () => {
  const stripe = useStripe()
  const [message, setMessage] = useState(null)
  const { clearCart } = useCartMutation()

  useEffect(() => {
    if (!stripe) {
      return
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    )

    if (!clientSecret) {
      return
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case 'succeeded':
          clearCart()
          setMessage('Payment succeeded!')
          break
        case 'processing':
          setMessage('Your payment is processing.')
          break
        case 'requires_payment_method':
          setMessage('Your payment was not successful, please try again.')
          break
        default:
          setMessage('Something went wrong.')
          break
      }
    })
  }, [stripe])

  return (
    <>
      {message ? (
        <div
          css={css`
            margin-top: 15px;
            background-color: blue;
            padding: 1rem;
            text-align: center;
            border-radius: 5px;
            color: var(--white-color);
          `}
          id="payment-message"
        >
          {message}
        </div>
      ) : (
        ''
      )}
    </>
  )
}

export default SuccessPayment
