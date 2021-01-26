import React from "react";
import higawariLogo from "../images/logo.svg";
//emは一番近いparentを基準として決める。
//remはrootつまりbodyのfont-sizeを基準として決める。
//bodyのfont-sizeの探し方はinspect-> compute -> font-sizeを検索。
export const Header = () => (
  <header className="py-4">
    <div className="mx-auto w-screen max-w-screen-2xl">
      <img src={higawariLogo} className=" w-36 mb-5" alt="Higawari-eats-logo" />
    </div>
  </header>
);
