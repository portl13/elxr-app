import "../styles/css/argon-design-system-react.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-multi-carousel/lib/styles.css";
import "../styles/main.css";
import "../styles/login.css";
import "../styles/chat.css";
import "../styles/community.css";
import "../styles/course.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@splidejs/react-splide/css";
import "quill/dist/quill.snow.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Provider } from "react-redux";
import MenuProvider from "../context/MenuContext";
import FilterContextProvider from "../context/FilterContext";
import EventsContextProvider from "../context/EventsContext";
import UserProvider from "../context/UserContext";
import ToastContext from "../context/ToastContext";
import ChannelProvider from "../context/ChannelContext";
import "@components/my-settings/styles.css";
import CartProvider from "@context/CartContext";
import { useStore } from "../store/store";
import { SessionProvider } from "next-auth/react";
import ThemeProvider from "@context/ThemeContext";
import "../styles/utilities.css";
import "../styles/buttons.css";
import "../styles/table.css";
import "../styles/icons.css";
import "../styles/image.css";
import "../styles/input.css";
import "../styles/card.css";
import "../styles/cover.css";
import "../styles/pagination.css";
import "../styles/baged.css";
import "../styles/custom.css";
import "../styles/editor.css";
import "../styles/modal.css";
import "../styles/member.css";
import "../styles/list.css";
import "../styles/spinner.css";
import "../styles/navbar.css";
import "../styles/payment.css";
import "../styles/subscription.css";
import "../styles/wallet.css";
import "../styles/scrolltags.css";
import "../styles/carrousel.css";
import "../styles/courses.css";
import "../styles/creator.css";
import "../styles/mediaLibrary.css";
import "../styles/featuredImage.css";
import "../styles/songList.css";
import "../styles/rcTime.css";
import "../styles/dropdown.css";
import "../styles/chat-event.css";
import "../styles/product.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const store = useStore(pageProps.state);
  return (
    <SessionProvider session={session}>
      <ThemeProvider>
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
      </ThemeProvider>
    </SessionProvider>
  );
}
export default MyApp;
