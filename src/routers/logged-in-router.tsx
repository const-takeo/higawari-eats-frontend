import React from "react";
import { isLoggedInVar } from "../apollo";

const LoggedInRouter = () => {
  const onClick = () => isLoggedInVar(false);
  return (
    <div>
      <span>LoggedIn</span>
      <br />
      <button onClick={onClick}>Log Out</button>
    </div>
  );
};

export default LoggedInRouter;
