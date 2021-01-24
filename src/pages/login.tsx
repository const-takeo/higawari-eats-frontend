import React from "react";

const Login = () => {
  return (
    <div className="flex bg-gradient-to-t from-purple-800 to-blue-100 h-screen items-center justify-center">
      <div className="bg-white w-full max-w-lg py-10 rounded-lg text-center">
        <h3 className=" text-xl text-gray-500">ログイン</h3>
        <form className="flex flex-col mt-5 px-5">
          <input
            placeholder="メール"
            className=" shadow-inner bg-gray-100 border-2 focus:outline-none focus:border-purple-300 rounded-lg py-3 mb-2 px-5"
          />
          <input
            placeholder="パスワード"
            className=" shadow-inner bg-gray-100 border-2 focus:outline-none focus:border-purple-300 rounded-lg py-3 px-5"
          />
          <button className="py-3 px-5 mt-2 bg-purple-600 text-white hover:opacity-90 focus:outline-none rounded-lg text-lg">
            ログイン
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
