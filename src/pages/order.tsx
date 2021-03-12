import { gql, useMutation, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router";
import { ALL_ORDER_FRAGMENT } from "../fragments";
import { useMe } from "../hooks/useMe";
import { editOrder, editOrderVariables } from "../__generated__/editOrder";
import { getOrder, getOrderVariables } from "../__generated__/getOrder";
import { OrderStatus, UserRole } from "../__generated__/globalTypes";
import { orderUpdates } from "../__generated__/orderUpdates";

const ORDER_SUB = gql`
  subscription orderUpdates($input: OrderUpdateInput!) {
    orderUpdates(input: $input) {
      ...AllOrderParts
    }
  }
  ${ALL_ORDER_FRAGMENT}
`;

interface IParams {
  id: string;
}

const GET_ORDERS = gql`
  query getOrder($input: GetOrderInput!) {
    getOrder(input: $input) {
      ok
      error
      order {
        ...AllOrderParts
      }
    }
  }
  ${ALL_ORDER_FRAGMENT}
`;

const EDIT_ORDER = gql`
  mutation editOrder($input: EditOrderInput!) {
    editOrder(input: $input) {
      error
      ok
    }
  }
`;
export const Order = () => {
  const params = useParams<IParams>();
  const { data: userData } = useMe();
  const [editOrderMutation] = useMutation<editOrder, editOrderVariables>(
    EDIT_ORDER
  );
  const { data, subscribeToMore } = useQuery<getOrder, getOrderVariables>(
    GET_ORDERS,
    {
      variables: {
        input: {
          id: +params.id,
        },
      },
    }
  );
  //
  useEffect(() => {
    if (data?.getOrder.ok) {
      subscribeToMore({
        document: ORDER_SUB,
        variables: {
          input: {
            id: +params.id,
          },
        },
        updateQuery: (
          prev,
          //objectArgumentにtypeを与える方法
          {
            subscriptionData: { data },
          }: { subscriptionData: { data: orderUpdates } }
        ) => {
          if (!data) return prev;
          //以前のクエリと同じ構造のクエリを返さなきゃならない
          return {
            getOrder: {
              ...prev.getOrder,
              order: {
                ...data.orderUpdates,
              },
            },
          };
        },
      });
    }
  }, [data]);
  //
  const onButtonClick = (newStatus: OrderStatus) => {
    editOrderMutation({
      variables: {
        input: {
          id: +params.id,
          status: newStatus,
        },
      },
    });
  };
  console.log(data);
  return (
    <div className="commonContainer justify-center flex">
      <Helmet>
        <title>注文 {params.id}| HigawariEats</title>
      </Helmet>
      <div className="border-2 border-gray-500 w-full max-w-screen-sm justify-center flex flex-col">
        <h4 className="w-full py-5 bg-gray-800 text-white text-center text-lg">
          注文番号 #{params.id}
        </h4>
        <h5 className="p-5 pt-10 text-3xl text-center">
          {data?.getOrder.order?.total}
        </h5>
        <div className="grid gap-6 text-xl p-5">
          <div className="border-t pt-5 border-gray-600">
            Prepared By:{" "}
            <span className="font-medium">
              {data?.getOrder.order?.restaurant?.name}
            </span>
          </div>
          <div className="border-t pt-5 border-gray-600">
            Deliver to:{" "}
            <span className="font-medium">
              {data?.getOrder.order?.customer?.email}
            </span>
          </div>

          <div className="border-t pt-5 border-gray-600">
            Driver:{" "}
            <span className="font-medium">
              {data?.getOrder.order?.driver?.email || "Not yet"}
            </span>
          </div>
        </div>
        {userData?.me.role === "Client" && (
          <span className="text-center mt-5 mb-3 text-2xl text-yellow-500">
            Status:{data?.getOrder.order?.status}
          </span>
        )}
        {userData?.me.role === UserRole.Owner && (
          <>
            {data?.getOrder.order?.status === OrderStatus.PENDING && (
              <button
                onClick={() => onButtonClick(OrderStatus.COOKING)}
                className="btn"
              >
                Accept Order
              </button>
            )}
            {data?.getOrder.order?.status === OrderStatus.COOKING && (
              <button
                onClick={() => onButtonClick(OrderStatus.COOKED)}
                className="btn"
              >
                Order Cooked
              </button>
            )}
            {data?.getOrder.order?.status !== OrderStatus.COOKING &&
              data?.getOrder.order?.status !== OrderStatus.PENDING && (
                <span className="text-center mt-5 mb-3 text-2xl text-yellow-500">
                  Status:{data?.getOrder.order?.status}
                </span>
              )}
          </>
        )}
        {userData?.me.role === UserRole.Delivery && (
          <>
            {data?.getOrder.order?.status === OrderStatus.COOKED && (
              <button
                onClick={() => onButtonClick(OrderStatus.PICKEDUP)}
                className="btn"
              >
                Picked Up
              </button>
            )}
            {data?.getOrder.order?.status === OrderStatus.PICKEDUP && (
              <button
                onClick={() => onButtonClick(OrderStatus.DELIVERED)}
                className="btn"
              >
                Order Delivered
              </button>
            )}
          </>
        )}
        {data?.getOrder.order?.status === OrderStatus.DELIVERED && (
          <span className="text-center mt-5 mb-3 text-2xl text-yellow-500">
            Thanks
          </span>
        )}
      </div>
    </div>
  );
};
