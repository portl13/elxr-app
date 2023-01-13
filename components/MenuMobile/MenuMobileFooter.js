import React from "react";
import Link from "next/link";

function MenuMobileFooter({ user, logout }) {
  return (
    <>
      <li className={"mb-2"}>
        <Link href={"/"}>
          <a className={"text-menu-color"}>Terms and Conditions</a>
        </Link>
      </li>{" "}
      <li className={"mb-2"}>
        <Link href={"/"}>
          <a className={"text-menu-color"}>Privacy Policy</a>
        </Link>
      </li>{" "}
      <li className={"mb-2"}>
        <a target={"_blank"} href={"https://support.portl.live/"} className={"text-menu-color"}>
          Contact
        </a>
      </li>{" "}
      <li className={"mb-2"}>
        {user ? (
          <button
            onClick={logout}
            className={"text-menu-color btn-transparent p-0"}
          >
            Sign Out
          </button>
        ) : (
          <Link href={"/login"}>
            <a
              className={
                "btn-sign-in text-white border-none mt-2 d-inline-block"
              }
            >
              Sign In
            </a>
          </Link>
        )}
      </li>
      <li className={"mt-4"}>
        <h5 className={"mb-0 font-size-12 text-menu-color"}>
          &copy; 2022 Portl nc. All rights reserved.
        </h5>
      </li>
    </>
  );
}

export default MenuMobileFooter;
