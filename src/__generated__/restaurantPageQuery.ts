/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RestaurantsInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: restaurantPageQuery
// ====================================================

export interface restaurantPageQuery_allCategories_categories {
  __typename: "CategoryEntity";
  id: number;
  name: string;
  coverImg: string | null;
  slug: string;
  restaurantCount: number;
}

export interface restaurantPageQuery_allCategories {
  __typename: "AllCategoriesOutput";
  ok: boolean;
  error: string | null;
  categories: restaurantPageQuery_allCategories_categories[] | null;
}

export interface restaurantPageQuery_restaurants_results_category {
  __typename: "CategoryEntity";
  name: string;
}

export interface restaurantPageQuery_restaurants_results {
  __typename: "RestaurantEntity";
  id: number;
  name: string;
  coverImg: string;
  category: restaurantPageQuery_restaurants_results_category | null;
  address: string;
}

export interface restaurantPageQuery_restaurants {
  __typename: "RestaurantsOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalResults: number | null;
  results: restaurantPageQuery_restaurants_results[] | null;
}

export interface restaurantPageQuery {
  allCategories: restaurantPageQuery_allCategories;
  restaurants: restaurantPageQuery_restaurants;
}

export interface restaurantPageQueryVariables {
  input: RestaurantsInput;
}
