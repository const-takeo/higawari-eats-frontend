import { gql, useApolloClient, useMutation } from "@apollo/client";
import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useMe } from "../../hooks/useMe";
import {
  verifyEmail,
  verifyEmailVariables,
} from "../../__generated__/verifyEmail";

const VERIFY_EMAIL_MUTATION = gql`
  mutation verifyEmail($input: VerifyEmailInput!) {
    verifyEmail(input: $input) {
      error
      ok
    }
  }
`;

export const ConfirmEmail = () => {
  const history = useHistory();
  const client = useApolloClient();
  const { data: userData } = useMe();
  const onCompleted = (data: verifyEmail) => {
    const {
      verifyEmail: { error, ok },
    } = data;
    if (ok && userData?.me.id) {
      //cacheを直接じゃなくてrefetchしてアップデートする方法
      // await refetch(); Promiseを返す、const { data: userData, refetch } = useMe();
      //cacheを直接修正する方法
      client.writeFragment({
        id: `UserEntity:${userData.me.id}`,
        fragment: gql`
          fragment VerifiedUser on UserEntity {
            verified
          }
        `,
        data: {
          verified: true,
        },
      });
      history.push("/");
    }
  };
  const [verifyTrg] = useMutation<verifyEmail, verifyEmailVariables>(
    VERIFY_EMAIL_MUTATION,
    {
      onCompleted,
    }
  );
  // hrefのコードを持ってくる１番目のoption
  // const location = useLocation();
  useEffect(() => {
    // console.log(location.search);
    const [_, code] = window.location.href.split("confirm?=");
    verifyTrg({
      variables: {
        input: {
          code,
        },
      },
    });
  }, []);
  return (
    <div className="flex flex-col text-center h-screen mt-60">
      <h2 className="text-lg font-semibold mb-2">
        アカウントを認証しています。
      </h2>
      <h4 className="text-gray-700">
        少々お待ちください。このページから離れないでください。
      </h4>
    </div>
  );
};
