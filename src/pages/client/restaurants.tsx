import { gql, useQuery } from "@apollo/client";
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
  console.log(data);
  return <h1>Restaurants</h1>;
};
