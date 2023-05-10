import React from "react"
import Link from "next/link"

function FooterSite() {
  return (
    <footer className={"footer-main"}>
      <ul className={"footer-site"}>
        <li>
          <a
            className={"text-menu-color footer-item"}
            href="mailto:support@portl.com"
          >
            &copy;{new Date().getFullYear()} ELXR
          </a>
        </li>{" "}
        <li>
          <a
            className={"text-menu-color footer-item"}
            href="mailto:support@portl.com"
          >
            Support
          </a>
        </li>{" "}
        <li>
          <Link href={"/"}>
            <a className={"text-menu-color footer-item"}>Privacy Policy</a>
          </Link>
        </li>{" "}
        <li>
          <Link href={"/terms-of-service"}>
            <a className={"text-menu-color footer-item"}>Terms</a>
          </Link>
        </li>{" "}
      </ul>
    </footer>
  )
}

export default FooterSite
