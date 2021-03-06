/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetOrderInput, OrderStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: getOrder
// ====================================================

export interface getOrder_getOrder_order_driver {
  __typename: "UserEntity";
  email: string;
}

export interface getOrder_getOrder_order_customer {
  __typename: "UserEntity";
  email: string;
}

export interface getOrder_getOrder_order_restaurant {
  __typename: "RestaurantEntity";
  name: string;
}

export interface getOrder_getOrder_order {
  __typename: "OrderEntity";
  id: number;
  status: OrderStatus;
  total: number | null;
  driver: getOrder_getOrder_order_driver | null;
  customer: getOrder_getOrder_order_customer | null;
  restaurant: getOrder_getOrder_order_restaurant | null;
}

export interface getOrder_getOrder {
  __typename: "GetOrderOutput";
  ok: boolean;
  error: string | null;
  order: getOrder_getOrder_order | null;
}

export interface getOrder {
  getOrder: getOrder_getOrder;
}

export interface getOrderVariables {
  input: GetOrderInput;
}
