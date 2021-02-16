import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

export const NotFound = () => (
  <div className="h-screen flex flex-col items-center mt-72">
    <Helmet>
      <title>Not Found | Higawari Eats</title>
    </Helmet>
    <h2 className="font-semibold text-2xl mb-3">
      ページを見つかりませんでした。
    </h2>
    <h4 className="font-medium mb-5 text-base">
      探しているページは存在しないか、移動されました。
    </h4>
    <Link
      to="/"
      className="text-yellow-600 text-opacity-75 hover:underline font-medium"
    >
      :-) ホームへ &rarr;{" "}
    </Link>
  </div>
);
