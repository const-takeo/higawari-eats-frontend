import Helmet from "react-helmet";
import higawariLogo from "../images/logo.svg";
import { gql, useMutation } from "@apollo/client";
import React from "react";
import { useForm } from "react-hook-form";
import { FormError } from "../components/form-error";
import {
  LoginMutation,
  LoginMutationVariables,
} from "../__generated__/LoginMutation";
import { Button } from "../components/button";
import { Link } from "react-router-dom";

interface ILoginForm {
  email: string;
  password: string;
}

const LOGIN_MUTAITION = gql`
  mutation LoginMutation($loginInput: LoginInput!) {
    login(input: $loginInput) {
      error
      ok
      token
    }
  }
`;

const Login = () => {
  const {
    register,
    getValues,
    handleSubmit,
    errors,
    formState,
  } = useForm<ILoginForm>({
    mode: "onChange",
  });
  const onCompleted = (data: LoginMutation) => {
    const {
      login: { ok, token },
    } = data;
    if (ok) {
      console.log(token);
    }
  };
  //useMutationの１番目のargsはmutation function, triggerの役割を果たす。
  //useMutationの2番目のargsはobject, {error, loading, data}
  const [loginTrg, { data: loginMutationResult, loading }] = useMutation<
    LoginMutation,
    LoginMutationVariables
  >(LOGIN_MUTAITION, { onCompleted });
  const onSubmit = () => {
    if (!loading) {
      const { email, password } = getValues();
      loginTrg({
        variables: {
          loginInput: {
            email,
            password,
          },
        },
      });
    }
  };
  return (
    <div className="h-screen flex flex-col items-center mt-5 lg:mt-28">
      <Helmet>
        <title>Higawari Eats | Login</title>
      </Helmet>
      <div className="w-full max-w-screen-sm flex flex-col items-center px-5">
        <img src={higawariLogo} className=" w-72 mb-5" />
        <h4 className="w-full text-left font-medium text-2xl mb-5">
          ご利用いただきありがとうございます
        </h4>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-3 mt-5 w-full mb-4"
        >
          <input
            ref={register({
              required: "メールを入力して下さい。",
              pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
            required
            type="email"
            name="email"
            placeholder="メール"
            className="inputCss"
          />
          {errors.email?.type === "pattern" && (
            <FormError
              errorMessage={"メールの形式に合わせてご入力して下さい。"}
            />
          )}
          {errors.email?.message && (
            <FormError errorMessage={errors.email?.message} />
          )}
          <input
            ref={register({
              required: "パスワードを入力して下さい。",
              minLength: 4,
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
          <Button
            canClick={formState.isValid}
            loading={loading}
            actionText="LogIn"
          />
          {loginMutationResult?.login.error && (
            <FormError errorMessage={loginMutationResult.login.error} />
          )}
        </form>
        <div>
          Higawariのご利用は初めてですか?{" "}
          <Link
            to="create-account"
            className="text-yellow-600 text-opacity-75 hover:underline"
          >
            アカウントを作成
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
