import React from "react";
import Link from "next/link";

export const Navigation = () => {
  return (
    <nav className="flex justify-center items-center py-4">
      <ul className="flex items-center space-x-8">
        <li>
          <Link href="/">
            <div className="flex flex-row items-center text-white ">
              <span>Home</span>
            </div>
          </Link>
        </li>
        <li>
          <Link href="/marvel">
            <img
              src="/assets/marvel.png"
              alt="Marvel Logo"
              height={100}
              width={100}
            />
          </Link>
        </li>
        <li>
          <Link href="/dc">
            <img src="/assets/dc.png" alt="DC Logo" height={100} width={100} />
          </Link>
        </li>
        <li>
          <Link href="/star-wars">
            <img
              src="/assets/star-wars.png"
              alt="Star Wars Logo"
              height={100}
              width={100}
            />
          </Link>
        </li>
      </ul>
    </nav>
  );
};
