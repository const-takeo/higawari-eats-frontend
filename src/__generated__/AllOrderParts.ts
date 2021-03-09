/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderStatus } from "./globalTypes";

// ====================================================
// GraphQL fragment: AllOrderParts
// ====================================================

export interface AllOrderParts_driver {
  __typename: "UserEntity";
  email: string;
}

export interface AllOrderParts_customer {
  __typename: "UserEntity";
  email: string;
}

export interface AllOrderParts_restaurant {
  __typename: "RestaurantEntity";
  name: string;
}

export interface AllOrderParts {
  __typename: "OrderEntity";
  id: number;
  status: OrderStatus;
  total: number | null;
  driver: AllOrderParts_driver | null;
  customer: AllOrderParts_customer | null;
  restaurant: AllOrderParts_restaurant | null;
}
