import React from "react";

interface IBtnProps {
  canClick: boolean;
  loading: boolean;
  actionText: string;
}

export const Button: React.FC<IBtnProps> = ({
  canClick,
  loading,
  actionText,
}) => (
  <button
    className={`focus:outline-none py-3 text-white transition duration-500 font-medium text-lg
    ${
      canClick
        ? "bg-yellow-600 bg-opacity-75 hover:bg-yellow-600"
        : "bg-gray-300 pointer-events-none"
    }`}
  >
    {loading ? "Loading.." : actionText}
  </button>
);
