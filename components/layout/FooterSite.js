import React from "react";
import Link from "next/link";

function FooterSite() {
  return (
    <footer>
      <ul>
        <li className={"mb-2"}>
          <a className={"text-menu-color"} href="mailto:support@portl.com">
            &copy;{new Date().getFullYear()} PORTL
          </a>
        </li>{" "}
        <li className={"mb-2"}>
          <a className={"text-menu-color"} href="mailto:support@portl.com">
            Support
          </a>
        </li>{" "}
        <li className={"mb-2"}>
          <Link href={"/"}>
            <a className={"text-menu-color"}>Privacy Policy</a>
          </Link>
        </li>{" "}
        <li className={"mb-2"}>
          <Link href={"/terms-of-service"}>
            <a className={"text-menu-color"}>Terms</a>
          </Link>
        </li>{" "}
      </ul>
    </footer>
  );
}

export default FooterSite;
