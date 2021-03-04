/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateRestaurantInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createRestaurants
// ====================================================

export interface createRestaurants_createRestaurants {
  __typename: "CreateRestaurantOutput";
  ok: boolean;
  error: string | null;
  restaurantId: number;
}

export interface createRestaurants {
  createRestaurants: createRestaurants_createRestaurants;
}

export interface createRestaurantsVariables {
  input: CreateRestaurantInput;
}
