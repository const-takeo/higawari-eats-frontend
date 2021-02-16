import { Helmet } from "react-helmet-async";
import higawariLogo from "../images/logo.svg";
import { gql, useMutation } from "@apollo/client";
import React from "react";
import { useForm } from "react-hook-form";
import { FormError } from "../components/form-error";
import { Button } from "../components/button";
import { Link, useHistory } from "react-router-dom";
import { UserRole } from "../__generated__/globalTypes";
import {
  createAccountMutation,
  createAccountMutationVariables,
} from "../__generated__/createAccountMutation";

interface CreateAccountForm {
  email: string;
  password: string;
  role: UserRole;
}

const CREATE_ACCOUNT_MUTAITION = gql`
  mutation createAccountMutation($createAccountInput: CreateAccountInput!) {
    createAccount(input: $createAccountInput) {
      error
      ok
    }
  }
`;

const CreateAccount = () => {
  const {
    register,
    getValues,
    handleSubmit,
    errors,
    formState,
  } = useForm<CreateAccountForm>({
    mode: "onChange",
    defaultValues: {
      role: UserRole.Client,
    },
  });
  const history = useHistory();
  const onCompleted = (data: createAccountMutation) => {
    const {
      createAccount: { ok },
    } = data;
    if (ok) {
      history.push("/");
    }
  };
  //useMutationの１番目のargsはmutation function, triggerの役割を果たす。
  //useMutationの2番目のargsはobject, {error, loading, data}
  const [
    createAccountMutation,
    { loading, error, data: createAccountResult },
  ] = useMutation<createAccountMutation, createAccountMutationVariables>(
    CREATE_ACCOUNT_MUTAITION,
    { onCompleted }
  );
  const onSubmit = () => {
    const { email, password, role } = getValues();
    if (!loading) {
      createAccountMutation({
        variables: {
          createAccountInput: {
            email,
            password,
            role,
          },
        },
      });
    }
  };
  return (
    <div className="h-screen flex flex-col items-center mt-5 lg:mt-28">
      <Helmet>
        <title>Create Account | Higawari Eats</title>
      </Helmet>
      <div className="w-full max-w-screen-sm flex flex-col items-center px-5">
        <img
          src={higawariLogo}
          className=" w-72 mb-5"
          alt="Higawari-eats-logo"
        />
        <h4 className="w-full text-left font-medium text-2xl mb-5">
          さあ始めましょう
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
          <select
            className="inputCss"
            name="role"
            ref={register({
              required: true,
            })}
          >
            {Object.keys(UserRole).map((role, index) => (
              <option key={index}>{role}</option>
            ))}
          </select>
          <Button
            canClick={formState.isValid}
            loading={loading}
            actionText="生成"
          />
          {createAccountResult?.createAccount.error && (
            <FormError errorMessage={createAccountResult.createAccount.error} />
          )}
        </form>
        <div>
          既にアカウントをお持ちでしょうか?{" "}
          <Link
            to="/"
            className="text-yellow-600 text-opacity-75 hover:underline"
          >
            ログイン
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
