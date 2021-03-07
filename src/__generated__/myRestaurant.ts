/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MyRestaurantInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: myRestaurant
// ====================================================

export interface myRestaurant_myRestaurant_restaurant_category {
  __typename: "CategoryEntity";
  name: string;
}

export interface myRestaurant_myRestaurant_restaurant_menu_options_choices {
  __typename: "DishChoice";
  name: string;
  extra: number | null;
}

export interface myRestaurant_myRestaurant_restaurant_menu_options {
  __typename: "DishOptions";
  name: string;
  extra: number | null;
  choices: myRestaurant_myRestaurant_restaurant_menu_options_choices[] | null;
}

export interface myRestaurant_myRestaurant_restaurant_menu {
  __typename: "DishEntity";
  id: number;
  name: string;
  price: number;
  photo: string | null;
  description: string;
  options: myRestaurant_myRestaurant_restaurant_menu_options[] | null;
}

export interface myRestaurant_myRestaurant_restaurant_orders {
  __typename: "OrderEntity";
  id: number;
  createdAt: any;
  total: number | null;
}

export interface myRestaurant_myRestaurant_restaurant {
  __typename: "RestaurantEntity";
  id: number;
  name: string;
  coverImg: string;
  category: myRestaurant_myRestaurant_restaurant_category | null;
  address: string;
  isPromoted: boolean;
  menu: myRestaurant_myRestaurant_restaurant_menu[];
  orders: myRestaurant_myRestaurant_restaurant_orders[];
}

export interface myRestaurant_myRestaurant {
  __typename: "MyRestaurantOutput";
  error: string | null;
  ok: boolean;
  restaurant: myRestaurant_myRestaurant_restaurant | null;
}

export interface myRestaurant {
  myRestaurant: myRestaurant_myRestaurant;
}

export interface myRestaurantVariables {
  input: MyRestaurantInput;
}
