import React from "react";
import { Button } from "../../components/button";
import { useMe } from "../../hooks/useMe";

export const EditProfile = () => {
  const { data: userData } = useMe();
  return (
    <div className="flex flex-col h-screen mt-52 items-center">
      <h4 className="font-semibold text-2xl mb-3">プロフィール</h4>
      <form className="grid gap-3 mt-5 w-full max-w-screen-sm mb-4">
        <input placeholder="メール" type="email" className="inputCss" />
        <input placeholder="パスワード" type="password" className="inputCss" />
        <Button canClick={true} loading={false} actionText={"更新"} />
      </form>
    </div>
  );
};
