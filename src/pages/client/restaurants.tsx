import { gql, useQuery } from "@apollo/client";
import HigawariBack from "../../images/higawariback.jpg";
import React from "react";
import {
  restaurantPageQuery,
  restaurantPageQueryVariables,
} from "../../__generated__/restaurantPageQuery";

//restaurants :{results:{isPromoted}}抜けてる状態
const RESTAURANT_QUERY = gql`
  query restaurantPageQuery($input: RestaurantsInput!) {
    allCategories {
      ok
      error
      categories {
        id
        name
        coverImg
        slug
        restaurantCount
      }
    }
    restaurants(input: $input) {
      ok
      error
      totalPages
      totalResults
      results {
        id
        name
        coverImg
        category {
          name
        }
        address
      }
    }
  }
`;

export const Restaurants = () => {
  const { data, loading, error } = useQuery<
    restaurantPageQuery,
    restaurantPageQueryVariables
  >(RESTAURANT_QUERY, {
    variables: {
      input: {
        page: 1,
      },
    },
  });
  return (
    <div className="relative w-full h-96 opacity-80">
      <img
        src={HigawariBack}
        alt="higawari-eats-background"
        className="w-full h-full"
      />
      <form className="absolute top-1/2 left-1/3 w-4/12">
        <input
          className="inputCss w-full border-0 items-center justify-center"
          type="Search"
          placeholder="探してるレストランは？"
        />
      </form>
      {!loading && (
        <div className="mt-5 mx-auto max-w-screen-2xl">
          <div className="flex justify-around max-w-xs mx-auto">
            {data?.allCategories.categories?.map((category) => (
              <div className="flex flex-col items-center cursor-pointer rounded-2xl hover:bg-gray-200">
                <div
                  className="w-14 h-14 rounded-full bg-yellow-500 bg-cover"
                  style={{ backgroundImage: `url(${category.coverImg})` }}
                ></div>
                <span className="mt-3 text-sm text-center font-medium">
                  {category.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
