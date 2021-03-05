import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { MENU_FRAGMENT, RESTAURANT_FRAGMENT } from "../../fragments";
import {
  myRestaurant,
  myRestaurantVariables,
} from "../../__generated__/myRestaurant";

const MY_RESTAURANT_QUERY = gql`
  query myRestaurant($input: MyRestaurantInput!) {
    myRestaurant(input: $input) {
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

interface IParams {
  id: string;
}

export const MyRestaurant = () => {
  const { id } = useParams<IParams>();
  const { data, error } = useQuery<myRestaurant, myRestaurantVariables>(
    MY_RESTAURANT_QUERY,
    {
      variables: {
        input: {
          id: parseInt(id),
        },
      },
    }
  );
  console.log(data, error);
  return (
    <div>
      <div
        className="bg-gray-400 py-28 bg-center bg-cover"
        style={{
          backgroundImage: `url(${data?.myRestaurant.restaurant?.coverImg})`,
        }}
      ></div>
      <div className="commonContainer mt-10">
        <h2 className="text-4xl font-medium mb-10">
          {data?.myRestaurant.restaurant?.name || "Loading..."}
        </h2>
        <Link to={""} className="mr-8 text-white bg-gray-800 py-3 px-10">
          メニューを追加 &rarr;
        </Link>
        <Link to={""} className="text-white bg-yellow-500 py-3 px-10">
          プロモション購入 &rarr;
        </Link>
        <div className="mt-10">
          {data?.myRestaurant.restaurant?.menu.length === 0 ? (
            <h4 className="text-xl mb-5">メニューがありません</h4>
          ) : null}
        </div>
      </div>
    </div>
  );
};
