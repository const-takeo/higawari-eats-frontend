/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SearchRestaurantInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: searchRestaurant
// ====================================================

export interface searchRestaurant_searchRestaurant_restaurants_category {
  __typename: "CategoryEntity";
  name: string;
}

export interface searchRestaurant_searchRestaurant_restaurants {
  __typename: "RestaurantEntity";
  id: number;
  name: string;
  coverImg: string;
  category: searchRestaurant_searchRestaurant_restaurants_category | null;
  address: string;
}

export interface searchRestaurant_searchRestaurant {
  __typename: "SearchRestaurnatOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalResults: number | null;
  restaurants: searchRestaurant_searchRestaurant_restaurants[] | null;
}

export interface searchRestaurant {
  searchRestaurant: searchRestaurant_searchRestaurant;
}

export interface searchRestaurantVariables {
  input: SearchRestaurantInput;
}
