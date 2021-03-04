import { gql, useMutation } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Button } from "../../components/button";
import {
  createRestaurants,
  createRestaurantsVariables,
} from "../../__generated__/createRestaurants";

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
}

export const AddRestaurant = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState,
    errors,
  } = useForm<IFormProps>({ mode: "onChange" });
  const [createRestaurantMutation, { loading, data }] = useMutation<
    createRestaurants,
    createRestaurantsVariables
  >(CREATE_RESTAURANT_MUTATION);
  const onSubmit = () => {
    console.log(getValues());
  };
  return (
    //   input nameはpropsのfield名と一緒にする事
    <div className="commonContainer">
      <Helmet>
        <title> Create Restaurant | Higawari Eats</title>
      </Helmet>
      <h1>addRestaurant</h1>
      <form onSubmit={onSubmit}>
        <input
          className="inputCss"
          type="text"
          name="name"
          placeholder="Name"
          ref={register({ required: "入力が必要です。" })}
        />
        <input
          className="inputCss"
          type="text"
          name="address"
          placeholder="Address"
          ref={register({ required: "入力が必要です。" })}
        />
        <input
          className="inputCss"
          type="text"
          name="categoryName"
          placeholder="Category Name"
          ref={register({ required: "入力が必要です。" })}
        />
        <Button
          loading={loading}
          canClick={formState.isValid}
          actionText="作成"
        />
      </form>
    </div>
  );
};
