import React from "react"
import Link from "next/link"
import Script from "next/script"

function FooterSite() {
  return (
    <>
      <footer className={"footer-main"}>
        <ul className={"footer-site"}>
          <li>
            <Link href={"/"}>
              <a className={"text-menu-color footer-item"}>
                &copy;{new Date().getFullYear()} ELXR
              </a>
            </Link>
          </li>{" "}
          <li>
            <a
              className={"text-menu-color footer-item"}
              href="https://support.elxr.life/"
              target="_blank"
            >
              Support
            </a>
          </li>{" "}
          <li>
            <a
              href="https://www.iubenda.com/privacy-policy/72422487"
              className={
                "text-menu-color footer-item iubenda-white no-brand iubenda-noiframe iubenda-embed iubenda-noiframe iubenda-nostyle"
              }
            >
              Privacy Policy
            </a>
          </li>{" "}
          <li>
            <Link href={"/terms-of-service"}>
              <a className={"text-menu-color footer-item"}>Terms</a>
            </Link>
          </li>{" "}
        </ul>
      </footer>
      <Script src="https://cdn.iubenda.com/iubenda.js" />
    </>
  )
}

export default FooterSite
