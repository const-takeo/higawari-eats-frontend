/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RestaurantInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: restaurant
// ====================================================

export interface restaurant_restaurant_restaurant_category {
  __typename: "CategoryEntity";
  name: string;
}

export interface restaurant_restaurant_restaurant {
  __typename: "RestaurantEntity";
  id: number;
  name: string;
  coverImg: string;
  category: restaurant_restaurant_restaurant_category | null;
  address: string;
}

export interface restaurant_restaurant {
  __typename: "RestaurantOutput";
  error: string | null;
  ok: boolean;
  restaurant: restaurant_restaurant_restaurant | null;
}

export interface restaurant {
  restaurant: restaurant_restaurant;
}

export interface restaurantVariables {
  input: RestaurantInput;
}
