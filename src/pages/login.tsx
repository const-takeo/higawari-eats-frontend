import React from "react";
import { useForm } from "react-hook-form";

interface ILoginForm {
  email?: string;
  password?: string;
}

const Login = () => {
  const { register, errors, getValues, handleSubmit } = useForm<ILoginForm>();
  const onSubmit = () => {
    console.log(getValues());
  };
  return (
    <div className="flex bg-gradient-to-t from-purple-800 to-blue-100 h-screen items-center justify-center">
      <div className="bg-white w-full max-w-lg pt-10 pb-7 rounded-lg text-center">
        <h3 className=" text-xl text-gray-500">ログイン</h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-3 mt-5 px-5"
        >
          <input
            ref={register({ required: "メールを入力して下さい。" })}
            required
            type="email"
            name="email"
            placeholder="メール"
            className="inputCss mb-2"
          />
          {errors.email?.message && (
            <span className="font-medium text-red-500">
              {errors.email.message}
            </span>
          )}
          <input
            ref={register({
              required: "パスワードを入力して下さい。",
              minLength: 10,
            })}
            required
            type="password"
            name="password"
            placeholder="パスワード"
            className="inputCss"
          />
          {errors.password?.type === "minLength" && (
            <span className="font-medium text-red-500">
              パスワードを10文字以上入力して下さい。
            </span>
          )}
          {errors.password?.message && (
            <span className="font-medium text-red-500">
              {errors.password.message}
            </span>
          )}
          <button className="mt-2 btnCss">ログイン</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
