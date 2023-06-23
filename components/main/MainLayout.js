import React, { useContext, useEffect, useState } from "react"
import Head from "next/head"
import { layoutDashBoardStyle } from "@components/layout/LayoutDashBoard.style"
import Meta from "@components/layout/Meta"
import { UserContext } from "@context/UserContext"
import { useMenu } from "@context/MenuContext"
import MenuFooterMobile from "@components/layout/MenuFooterMobile"
import { preload } from "swr"
import { genericFetch as fetchPublic } from "@request/creator"
import MainHeader from "@components/main/MainHeader"
import MainCategories from "@components/main/MainCategories"
import MenuMobile from "@components/MenuMobile/MenuMobile"
import { genericFetch } from "@request/dashboard"
import FooterSite from "@components/layout/FooterSite"
import { ChannelContext } from "@context/ChannelContext"
import { useRouter } from "next/router"
import InputSearch from '@components/ui/inputs/InputSearch'

const allowedRoutesText = {
  '/': 'Search for Channels, Events, Video, Podcasts and more...',
  '/channels': 'Search for Channels',
  '/creators': 'Search for Creators',
  '/events': 'Search for Events',
  '/videos': 'Search for Videos',
  '/podcasts': 'Search for Podcasts',
  '/music': 'Search for Music',
  '/blogs': 'Search for Blogs',
  '/courses': 'Search for Courses',
}

const allowedRoutes = [
  '/',
  '/home',
  '/channels',
  '/creators',
  '/events',
  '/videos',
  '/podcasts',
  '/music',
  '/blogs',
  '/courses',
]


function MainLayout({
  children,
  className = "",
  disappear = false,
  title,
  classNameContainer = "",
  classNameMain = "",
  showCat = false,
  branding = {
    logo: false,
    theme: null,
    show_all: false,
  },
}) {
  const { show } = useMenu()
  const { user, status } = useContext(UserContext)
  const { setSearch, search } = useContext(ChannelContext)
  const [openSearch, setOpenSearch] = useState(false)
  const router = useRouter()
  useEffect(() => {
    if (status === "loading") return
    preload(
      status === "authenticated" && user
        ? [
            `${process.env.bossApi}/activity?per_page=20&page=1&scope=following`,
            user?.token,
          ]
        : `${process.env.bossApi}/activity?per_page=20&page=1`,
      status === "authenticated" && user ? genericFetch : fetchPublic
    )
  }, [status])

  return (
    <>
      <Meta branding={branding} />
      <Head>{title ? <title>{title}</title> : null}</Head>
      <div
        css={layoutDashBoardStyle}
        className={`main_grid position-relative ${show ? "active" : ""}`}
      >
        <MainHeader 
        branding={branding} 
        openSearch={openSearch}
        setOpenSearch={setOpenSearch}
        />
        <main className={`main ${classNameMain}`}>
        {allowedRoutes.includes(router.asPath) ? (
            <>
              {openSearch ? (
                <div className="px-3 mt-4 mb-4 d-lg-none w-100">
                  <InputSearch
                    placeholder={allowedRoutesText[router.asPath]}
                    value={search}
                    setValue={setSearch}
                  />
                </div>
              ) : null}
            </>
          ) : null}
          {showCat && <MainCategories />}
          <section className={`section-main ${classNameContainer}`}>
            {children}
          </section>
        </main>
        <FooterSite />
      </div>
      <MenuMobile />
      {user && !disappear ? (
        <MenuFooterMobile user={user} className={className} />
      ) : null}
      {/* <Script
        dangerouslySetInnerHTML={{
          __html: `var _iub = _iub || [];
          _iub.csConfiguration = {"askConsentAtCookiePolicyUpdate":true,"countryDetection":true,"enableLgpd":true,"enableUspr":true,"gdprAppliesGlobally":false,"lang":"en","lgpdAppliesGlobally":false,"perPurposeConsent":true,"siteId":3131778,"whitelabel":false,"cookiePolicyId":72422487, "banner":{ "acceptButtonCaptionColor":"#FFFFFF","acceptButtonColor":"#0073CE","acceptButtonDisplay":true,"backgroundColor":"#FFFFFF","brandBackgroundColor":"#FFFFFF","brandTextColor":"#000000","closeButtonDisplay":false,"customizeButtonCaptionColor":"#4D4D4D","customizeButtonColor":"#DADADA","customizeButtonDisplay":true,"explicitWithdrawal":true,"listPurposes":true,"logo":"https://elxr.life/img/brand/logo.png","position":"float-top-center","rejectButtonCaptionColor":"#FFFFFF","rejectButtonColor":"#0073CE","rejectButtonDisplay":true,"showPurposesToggles":true,"textColor":"#000000" }};`,
        }}
      />
      <Script src="https://cdn.iubenda.com/cs/gpp/stub.js" />
      <Script strategy="lazyOnload" src="https://cdn.iubenda.com/cs/iubenda_cs.js" /> */}
    </>
  )
}

export default MainLayout
