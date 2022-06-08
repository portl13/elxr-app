import '../styles/css/argon-design-system-react.css'
import 'react-datepicker/dist/react-datepicker.css'
import 'stream-chat-react/dist/css/index.css'
import 'react-multi-carousel/lib/styles.css'
import '../styles/main.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import MenuProvider from '../context/MenuContext'
import FilterContextProvider from '../context/FilterContext'
import EventsContextProvider from '../context/EventsContext'
import UserProvider from '../context/UserContext'
import ToastContext from '../context/ToastContext'
import ChannelProvider from '../context/ChannelContext'
import '@components/my-settings/styles.css'
import CartProvider from '@context/CartContext'

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <CartProvider>
        <MenuProvider>
          <ToastContext>
            <FilterContextProvider>
              <EventsContextProvider>
                <ChannelProvider>
                  <Component {...pageProps} />
                </ChannelProvider>
              </EventsContextProvider>
            </FilterContextProvider>
          </ToastContext>
        </MenuProvider>
      </CartProvider>
    </UserProvider>
  )
}
export default MyApp
