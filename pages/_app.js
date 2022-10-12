import '../styles/css/argon-design-system-react.css'
import 'react-datepicker/dist/react-datepicker.css'
import 'stream-chat-react/dist/css/index.css'
import 'react-multi-carousel/lib/styles.css'
import '../styles/main.css'
import '../styles/login.css'
import '../styles/chat.css'
import '../styles/community.css'
import '../styles/course.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import '@splidejs/react-splide/css';
import { Provider } from 'react-redux'
import MenuProvider from '../context/MenuContext'
import FilterContextProvider from '../context/FilterContext'
import EventsContextProvider from '../context/EventsContext'
import UserProvider from '../context/UserContext'
import ToastContext from '../context/ToastContext'
import ChannelProvider from '../context/ChannelContext'
import '@components/my-settings/styles.css'
import CartProvider from '@context/CartContext'
import { useStore } from '../store/store'

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.state)
  return (
    <Provider store={store}>
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
    </Provider>
  )
}
export default MyApp
