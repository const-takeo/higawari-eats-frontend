import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import { useMe } from "../hooks/useMe";
import higawariLogo from "../images/logo.svg";
//emは一番近いparentを基準として決める。
//remはrootつまりbodyのfont-sizeを基準として決める。
//bodyのfont-sizeの探し方はinspect-> compute -> font-sizeを検索。
export const Header = () => {
  //一変apiを二回呼び出すように見えるが、実はapolloが凄過ぎてuseMeのデータがcacheにあることをしている。
  //なので二度apiを呼ばない。
  const { data } = useMe();
  return (
    <>
      {data?.me.verified !== true && (
        <div className="bg-yellow-600 text-center p-5 font-light text-white">アカウントを認証して下さい。</div>
      )}
      <header className="py-4">
        <div className=" pl-3 pr-7 xl:px-0 mx-auto w-screen max-w-screen-2xl flex justify-between items-center bg-gray-200">
          <img
            src={higawariLogo}
            className=" w-36 mb-5"
            alt="Higawari-eats-logo"
          />
          <span className="text-xs">
            <Link to="/my-profile">
              <FontAwesomeIcon
                icon={faUser}
                className="text-2xl text-yellow-600 text-opacity-75"
              />
            </Link>
          </span>
        </div>
      </header>
    </>
  );
};
