import { gql, useApolloClient, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Button } from "../../components/button";
import { FormError } from "../../components/form-error";
import {
  createRestaurants,
  createRestaurantsVariables,
} from "../../__generated__/createRestaurants";
import { MY_RESTAURANTS_QUERY } from "./my-restaurants";

const CREATE_RESTAURANT_MUTATION = gql`
  mutation createRestaurants($input: CreateRestaurantInput!) {
    createRestaurants(input: $input) {
      ok
      error
      restaurantId
    }
  }
`;

interface IFormProps {
  name: string;
  address: string;
  categoryName: string;
  file: FileList;
}

export const AddRestaurant = () => {
  const client = useApolloClient();
  const history = useHistory();
  const [imageUrl, setImageUrl] = useState("");
  const onCompleted = (data: createRestaurants) => {
    const {
      createRestaurants: { ok, restaurantId, error },
    } = data;
    if (ok) {
      const { file, name, categoryName, address } = getValues();
      setUploading(false);
      const queryResult = client.readQuery({ query: MY_RESTAURANTS_QUERY });
      //fake cache -> It doesnt touch the API
      client.writeQuery({
        query: MY_RESTAURANTS_QUERY,
        data: {
          myRestaurants: {
            ...queryResult.myRestaurants,
            restaurants: [
              {
                address,
                category: {
                  __typename: "CategoryEntity",
                  name: categoryName,
                },
                coverImg: imageUrl,
                id: restaurantId,
                isPromoted: false,
                name,
                __typename: "RestaurantEntity",
              },
              ...queryResult.myRestaurants.restaurants,
            ],
          },
        },
      });
      history.push("/");
    }
  };
  const [createRestaurantMutation, { data }] = useMutation<
    createRestaurants,
    createRestaurantsVariables
  >(CREATE_RESTAURANT_MUTATION, { onCompleted });
  const {
    register,
    handleSubmit,
    getValues,
    formState,
    errors,
  } = useForm<IFormProps>({ mode: "onChange" });
  const [uploading, setUploading] = useState(false);
  const onSubmit = async () => {
    try {
      setUploading(true);
      const { file, name, categoryName, address } = getValues();
      const actualFile = file[0];
      const formBody = new FormData();
      formBody.append("file", actualFile);
      console.log(name, address);
      //request
      const { url: coverImg } = await (
        await fetch("http://localhost:4000/uploads/", {
          method: "POST",
          body: formBody,
        })
      ).json();
      setImageUrl(coverImg);
      createRestaurantMutation({
        variables: {
          input: {
            name,
            categoryName,
            address,
            coverImg,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    //   input nameはpropsのfield名と一緒にする事
    <div className="commonContainer w-full max-w-screen-sm flex flex-col items-center px-5">
      <Helmet>
        <title> Create Restaurant | Higawari Eats</title>
      </Helmet>
      <h4 className="font-semibold text-2xl mb-3">レストラン作成</h4>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-3 mt-5 w-full mb-4"
      >
        <input
          className="inputCss"
          type="text"
          name="name"
          placeholder="商名"
          ref={register({ required: "入力が必要です。", minLength: 4 })}
        />
        {errors.name?.type === "minLength" && (
          <FormError errorMessage={"4文字以上入力してください。"} />
        )}
        <input
          className="inputCss"
          type="text"
          name="address"
          placeholder="住所"
          ref={register({ required: "入力が必要です。" })}
        />
        <input
          className="inputCss"
          type="text"
          name="categoryName"
          placeholder="カテゴリー名"
          ref={register({ required: "入力が必要です。" })}
        />
        <input
          type="file"
          name="file"
          accept="image/*"
          ref={register({ required: true })}
        />
        <Button
          loading={uploading}
          canClick={formState.isValid}
          actionText="作成"
        />
        {data?.createRestaurants?.error && (
          <FormError errorMessage={data.createRestaurants.error} />
        )}
      </form>
    </div>
  );
};
