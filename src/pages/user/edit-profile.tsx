import { gql, useApolloClient, useMutation } from "@apollo/client";
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../components/button";
import { FormError } from "../../components/form-error";
import { useMe } from "../../hooks/useMe";
import {
  editProfile,
  editProfileVariables,
} from "../../__generated__/editProfile";

const EDIT_PROFILE_MUTATION = gql`
  mutation editProfile($input: EditProfileInput!) {
    editProfile(input: $input) {
      error
      ok
    }
  }
`;

interface IFormProps {
  email?: string;
  password?: string;
}

export const EditProfile = () => {
  const client = useApolloClient();
  const { data: userData } = useMe();
  const {
    register,
    handleSubmit,
    getValues,
    formState,
    errors,
  } = useForm<IFormProps>({
    mode: "onChange",
    defaultValues: {
      email: userData?.me.email,
    },
  });
  const onSubmit = () => {
    const { email, password } = getValues();
    editProfileTrg({
      variables: {
        input: {
          email,
          ...(password !== "" && { password }),
        },
      },
    });
  };
  const onCompleted = (data: editProfile) => {
    const {
      editProfile: { ok },
    } = data;
    if (ok && userData) {
      const {
        me: { email: prevEmail, id },
      } = userData;
      const { email: newEmail } = getValues();
      if (prevEmail !== newEmail) {
        client.writeFragment({
          id: `UserEntity:${id}`,
          fragment: gql`
            fragment EditedUser on UserEntity {
              verified
              email
            }
          `,
          data: {
            email: newEmail,
            verified: false,
          },
        });
      }
    }
  };
  const [editProfileTrg, { data, loading, error }] = useMutation<
    editProfile,
    editProfileVariables
  >(EDIT_PROFILE_MUTATION, {
    onCompleted,
  });
  return (
    <div className="flex flex-col h-screen mt-52 items-center">
      <h4 className="font-semibold text-2xl mb-3">プロフィール</h4>
      <form
        className="grid gap-3 mt-5 w-full max-w-screen-sm mb-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          ref={register({
            required: "メールを入力して下さい。",
            pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          })}
          required
          name="email"
          placeholder="メール"
          type="email"
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
            minLength: 8,
          })}
          name="password"
          placeholder="パスワード"
          type="password"
          className="inputCss"
        />
        {errors.password?.type === "minLength" && (
          <FormError errorMessage={"パスワードを8文字以上入力して下さい。"} />
        )}
        {errors.password?.message && (
          <FormError errorMessage={errors.password?.message} />
        )}
        <Button
          canClick={formState.isValid}
          loading={loading}
          actionText={"更新"}
        />
      </form>
    </div>
  );
};
