import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

/**
 * Site Menu
 */
export const Menu = () => {
  const { asPath } = useRouter();
  return (
    <div>
      <div role="tablist" className="tabs tabs-lifted tabs-xl">
        <Link role="tab" href="/" className={`${asPath === "/" ? "" : "tab-active"} tab`}>
          Home
        </Link>

        <Link role="tab" href="/members" className={`${asPath === "/members" ? "" : "tab-active"} tab`}>
          Members
        </Link>

        {/* <li>
          <Link
            href="/contributions"
            className={`${asPath === "/contributions" ? "" : "link"} link-primary underline-offset-2`}
          >
            Projects
          </Link>
        </li> */}
        {/* <li>
          <Link href="/faq" className={`${asPath === "/faq" ? "" : "link"} link-primary underline-offset-2`}>
            F.A.Q.
          </Link>
        </li> */}
      </div>
    </div>
  );
};
