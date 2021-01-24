import React from "react";
import { isLoggedInVar } from "../apollo";

const LoggedOutRouter = () => {
  const onClick = () => {
    isLoggedInVar(true);
  };
  return (
    <>
      <div>Logged Out</div>
      <button onClick={onClick}>Click to Login</button>
    </>
  );
};

export default LoggedOutRouter;
