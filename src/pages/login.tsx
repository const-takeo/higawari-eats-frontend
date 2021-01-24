import { gql, useMutation } from "@apollo/client";
import React from "react";
import { useForm } from "react-hook-form";
import { FormError } from "../components/form-error";

interface ILoginForm {
  email?: string;
  password?: string;
}

const LOGIN_MUTAITION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      error
      ok
      token
    }
  }
`;

const Login = () => {
  const { register, errors, getValues, handleSubmit } = useForm<ILoginForm>();
  //useMutationの１番目のargsはmutation function, triggerの役割を果たす。
  //useMutationの2番目のargsはobject, {error, loading, data}
  const [loginTrg] = useMutation(LOGIN_MUTAITION);
  const onSubmit = () => {
    const { email, password } = getValues();
    loginTrg({
      variables: {
        email,
        password,
      },
    });
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
            <FormError errorMessage={errors.email?.message} />
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
            <FormError
              errorMessage={"パスワードを10文字以上入力して下さい。"}
            />
          )}
          {errors.password?.message && (
            <FormError errorMessage={errors.password?.message} />
          )}
          <button className="mt-2 btnCss">ログイン</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
