import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Dish } from "../../components/dish";
import { DishOptions } from "../../components/dish-option";
import { MENU_FRAGMENT, RESTAURANT_FRAGMENT } from "../../fragments";
import {
  createOrder,
  createOrderVariables,
} from "../../__generated__/createOrder";
import { CreateOrderItemInput } from "../../__generated__/globalTypes";
import {
  restaurant,
  restaurantVariables,
} from "../../__generated__/restaurant";

const RESTAURANT_QUERY = gql`
  query restaurant($input: RestaurantInput!) {
    restaurant(input: $input) {
      error
      ok
      restaurant {
        ...RestaurantParts
        menu {
          ...MenuParts
        }
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${MENU_FRAGMENT}
`;

const CREATE_ORDER_MUTATION = gql`
  mutation createOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      error
      ok
      orderId
    }
  }
`;

interface IPProps {
  id: string;
}

export const Restaurant = () => {
  const params = useParams<IPProps>();
  //useQuery
  const { data, loading } = useQuery<restaurant, restaurantVariables>(
    RESTAURANT_QUERY,
    {
      variables: {
        input: {
          restaurantId: parseInt(params.id),
        },
      },
    }
  );
  //useState
  const [order, setOrder] = useState(false);
  const [orderItems, setOrderItems] = useState<CreateOrderItemInput[]>([]);
  //method
  const getItem = (dishId: number) => {
    return orderItems.find((order) => order.dishId === dishId);
  };
  const orderTrigger = () => {
    setOrder(true);
  };
  const addItem = (dishId: number) => {
    if (orderItems.find((order) => order.dishId === dishId)) {
      return;
    }
    setOrderItems((current) => [{ dishId, options: [] }, ...current]);
  };
  const removeItem = (dishId: number) => {
    setOrderItems((current) =>
      current.filter((dish) => dish.dishId !== dishId)
    );
  };
  const isSelected = (dishId: number) => {
    return Boolean(getItem(dishId));
  };
  const addOption = (dishId: number, optionName: string) => {
    if (!isSelected(dishId)) {
      return;
    }
    //stateをmutateするのではなく新しくしてまたreturnするために
    const oldOne = getItem(dishId);
    if (oldOne) {
      const hasOption = Boolean(
        oldOne.options?.find((oldOption) => oldOption.name === optionName)
      );
      if (!hasOption) {
        removeItem(dishId);
        setOrderItems((current) => [
          { dishId, options: [{ name: optionName }, ...oldOne.options!] },
          ...current,
        ]);
      }
    }
  };
  const getOptionFromItem = (
    item: CreateOrderItemInput,
    optionName: string
  ) => {
    return item.options?.find((option) => option.name === optionName);
  };
  const isOptionSelected = (dishId: number, optionName: string) => {
    const item = getItem(dishId);
    if (item) {
      return Boolean(getOptionFromItem(item, optionName));
    }
    return false;
  };
  const removeOptionFromItem = (dishId: number, optionName: string) => {
    if (!isSelected(dishId)) {
      return;
    }
    const oldOne = getItem(dishId);
    if (oldOne) {
      removeItem(dishId);
      setOrderItems((current) => [
        {
          dishId,
          options: oldOne.options?.filter(
            (option) => option.name !== optionName
          ),
        },
        ...current,
      ]);
      return;
    }
  };
  const cancelOrder = () => {
    setOrder(false);
    setOrderItems([]);
  };
  const confirmOrder = () => {
    console.log("click", orderItems);

    if (orderItems.length === 0) {
      alert("nonono");
      return;
    }
    const ok = window.confirm("are you sure?");
    if (ok) {
      createOrderMutation({
        variables: {
          input: {
            restaurantId: +params.id,
            items: orderItems,
          },
        },
      });
    }
  };
  //useHistory
  const history = useHistory();
  //onCompleted
  const onCompleted = (data: createOrder) => {
    const {
      createOrder: { ok, orderId },
    } = data;
    if (ok) {
      history.push(`/orders/${orderId}`);
    }
  };
  //useMutation
  const [
    createOrderMutation,
    { data: mutationData, loading: placingOrder },
  ] = useMutation<createOrder, createOrderVariables>(CREATE_ORDER_MUTATION, {
    onCompleted,
  });

  //render
  return (
    <div>
      <div
        className="bg-cover bg-center mx-auto max-w-screen-2xl bg-gray-500 bg-cover bg-center py-40"
        style={{
          backgroundImage: `url(${data?.restaurant.restaurant?.coverImg})`,
        }}
      >
        <div className="bg-white bg-opacity-90 w-2/6 py-8 ml-1 pl-1">
          <h4 className="text-3xl mb-3">{data?.restaurant.restaurant?.name}</h4>
          <h5 className="text-sm font-light mb-1">
            {data?.restaurant.restaurant?.category?.name}
          </h5>
          <h5 className="text-sm font-light">
            {data?.restaurant.restaurant?.address}
          </h5>
        </div>
      </div>
      <div className="commonContainer pb-32 flex flex-col items-end mt-20">
        {!order && (
          <button onClick={orderTrigger} className="btn px-10">
            注文スタート
          </button>
        )}
        {order && (
          <div className="flex items-center">
            <button onClick={confirmOrder} className="btn px-10 mr-3">
              確定
            </button>
            <button onClick={cancelOrder} className="btn px-10">
              取消
            </button>
          </div>
        )}

        <div className="w-full md:grid grid-cols-3 gap-x-7 gap-y-10 mt-16">
          {data?.restaurant.restaurant?.menu.map((menu) => (
            <Dish
              removeItem={removeItem}
              isSelected={isSelected(menu.id)}
              id={menu.id}
              addItem={addItem}
              order={order}
              isCoustomer={true}
              name={menu.name}
              description={menu.description}
              price={menu.price}
              options={menu.options}
            >
              {menu.options?.map((option, index) => (
                <DishOptions
                  index={index}
                  key={index}
                  dishId={menu.id}
                  isSelected={isOptionSelected(menu.id, option.name)}
                  name={option.name}
                  extra={option.extra}
                  addOption={addOption}
                  removeOptionFromItem={removeOptionFromItem}
                />
              ))}
            </Dish>
          ))}
        </div>
      </div>
    </div>
  );
};
