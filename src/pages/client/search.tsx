import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const Search = () => {
  const location = useLocation();
  useEffect(() => {
    console.log(location);
  }, []);
  return <div>search page</div>;
};
