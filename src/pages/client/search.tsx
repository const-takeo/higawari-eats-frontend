import { gql, useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useHistory, useLocation } from "react-router-dom";
import { RESTAURANT_FRAGMENT } from "../../fragments";
import {
  searchRestaurant,
  searchRestaurantVariables,
} from "../../__generated__/searchRestaurant";

const SEARCH_RESTAURANT = gql`
  query searchRestaurant($input: SearchRestaurantInput!) {
    searchRestaurant(input: $input) {
      ok
      error
      totalPages
      totalResults
      restaurants {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

export const Search = () => {
  const history = useHistory();
  const location = useLocation();
  //lazy query
  //lazy queryは一般的なqueryとは違う物を返す => queryTuple
  const [queryReady, { loading, data, called }] = useLazyQuery<
    searchRestaurant,
    searchRestaurantVariables
  >(SEARCH_RESTAURANT);
  useEffect(() => {
    const [_, query] = location.search.split("?term=");
    if (!query) {
      //history.push & history.replaceの違いはreplaceの場合history APIに追加されない（履歴）
      return history.replace("/");
    }
    queryReady({
      variables: {
        input: {
          page: 1,
          query,
        },
      },
    });
  }, [history, location.search]);
  console.log(loading, data, called);
  return (
    <div>
      <Helmet>
        <title>Search | Higawari Eats</title>
      </Helmet>
      search page
    </div>
  );
};
