/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderStatus } from "./globalTypes";

// ====================================================
// GraphQL subscription operation: pendingOrders
// ====================================================

export interface pendingOrders_pendingOrders_driver {
  __typename: "UserEntity";
  email: string;
}

export interface pendingOrders_pendingOrders_customer {
  __typename: "UserEntity";
  email: string;
}

export interface pendingOrders_pendingOrders_restaurant {
  __typename: "RestaurantEntity";
  name: string;
}

export interface pendingOrders_pendingOrders {
  __typename: "OrderEntity";
  id: number;
  status: OrderStatus;
  total: number | null;
  driver: pendingOrders_pendingOrders_driver | null;
  customer: pendingOrders_pendingOrders_customer | null;
  restaurant: pendingOrders_pendingOrders_restaurant | null;
}

export interface pendingOrders {
  pendingOrders: pendingOrders_pendingOrders;
}
