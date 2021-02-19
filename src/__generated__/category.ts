/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CategoryInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: category
// ====================================================

export interface category_category_restaurants_category {
  __typename: "CategoryEntity";
  name: string;
}

export interface category_category_restaurants {
  __typename: "RestaurantEntity";
  id: number;
  name: string;
  coverImg: string;
  category: category_category_restaurants_category | null;
  address: string;
}

export interface category_category_category {
  __typename: "CategoryEntity";
  id: number;
  name: string;
  coverImg: string | null;
  slug: string;
  restaurantCount: number;
}

export interface category_category {
  __typename: "CategoryOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalResults: number | null;
  restaurants: category_category_restaurants[] | null;
  category: category_category_category | null;
}

export interface category {
  category: category_category;
}

export interface categoryVariables {
  input: CategoryInput;
}
