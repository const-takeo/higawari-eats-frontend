import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import { Dish } from "../../components/dish";
import { MENU_FRAGMENT, RESTAURANT_FRAGMENT } from "../../fragments";
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

interface IPProps {
  id: string;
}
export const Restaurant = () => {
  const params = useParams<IPProps>();
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
  console.log(data, loading);
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
      <div className="commonContainer md:grid grid-cols-3 gap-x-7 gap-y-10 mt-8">
        {data?.restaurant.restaurant?.menu.map((menu) => (
          <Dish
            isCoustomer={true}
            name={menu.name}
            description={menu.description}
            price={menu.price}
            options={menu.options}
          />
        ))}
      </div>
    </div>
  );
};
