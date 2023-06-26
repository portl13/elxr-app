import React from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { css } from "@emotion/core"
import LupaIcon from '@icons/LupaIcon'

const AuthButtons = ({
  classNameContainer = "",
  openSearch,
  setOpenSearch,
}) => {
  const router = useRouter()

  return (
    <span 
    css={css`
    .menu-movil-icon {
      svg,
      img {
        width: 22px;
      }
    }
  `}
    className={`d-md-flex ${classNameContainer}`}>
      <div className="d-flex align-items-center">
      <button
          onClick={() => setOpenSearch(!openSearch)}
          className="menu-movil-icon position-relative d-flex justify-content-center align-items-center no-btn mt-0 mb-0 mr-2 d-md-none"
        >
          <LupaIcon />
        </button>
        <Link
          href={`/login${
            router.asPath === "/" ? "" : "?next=" + router.asPath
          } `}
        >
          <a className="btn btn-auth px-2 px-md-4 br-25">Sign In</a>
        </Link>
        <Link href="/signup">
          <a className="btn btn-auth-outline px-2 px-md-4  br-25">Sign Up</a>
        </Link>
      </div>
    </span>
  )
}

export default AuthButtons
