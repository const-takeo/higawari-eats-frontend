/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderUpdateInput, OrderStatus } from "./globalTypes";

// ====================================================
// GraphQL subscription operation: orderUpdates
// ====================================================

export interface orderUpdates_orderUpdates_driver {
  __typename: "UserEntity";
  email: string;
}

export interface orderUpdates_orderUpdates_customer {
  __typename: "UserEntity";
  email: string;
}

export interface orderUpdates_orderUpdates_restaurant {
  __typename: "RestaurantEntity";
  name: string;
}

export interface orderUpdates_orderUpdates {
  __typename: "OrderEntity";
  id: number;
  status: OrderStatus;
  total: number | null;
  driver: orderUpdates_orderUpdates_driver | null;
  customer: orderUpdates_orderUpdates_customer | null;
  restaurant: orderUpdates_orderUpdates_restaurant | null;
}

export interface orderUpdates {
  orderUpdates: orderUpdates_orderUpdates;
}

export interface orderUpdatesVariables {
  input: OrderUpdateInput;
}
