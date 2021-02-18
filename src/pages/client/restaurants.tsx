import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Restaurant } from "../../components/restaurant";
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
  const [page, setPage] = useState(1);
  const { data, loading } = useQuery<
    restaurantPageQuery,
    restaurantPageQueryVariables
  >(RESTAURANT_QUERY, {
    variables: {
      input: {
        page,
      },
    },
  });
  const onNextPageClick = () => setPage((current) => current + 1);
  const onPrevPageClick = () => setPage((current) => current - 1);
  return (
    <div>
      <form
        style={{
          backgroundImage: `url(https://resources.matcha-jp.com/archive_files/jp/2016/09/what_is_sakura.jpg)`,
        }}
        className="w-full py-40 flex items-center justify-center bg-cover bg-center mx-auto max-w-screen-2xl"
      >
        <input
          className="inputCss w-3/4 border-0 items-center justify-center md:w-3/12"
          type="Search"
          placeholder="探してるレストランは？"
        />
      </form>
      {!loading && (
        <div className="mt-8 mx-auto max-w-screen-2xl mb-20">
          {/* //category component */}
          <div className="justify-around flex max-w-lg mx-auto">
            {data?.allCategories.categories?.map((category) => (
              <div className="flex flex-col items-center cursor-pointer group">
                <div
                  className="w-14 h-14 rounded-full bg-cover "
                  style={{ backgroundImage: `url(${category.coverImg})` }}
                ></div>
                <span className="mt-3 text-sm text-center font-medium group-hover:bg-gray-200 rounded-lg">
                  {category.name}
                </span>
              </div>
            ))}
          </div>
          {/* // */}
          <div className="grid grid-cols-3 gap-x-7 gap-y-10 mt-8">
            {data?.restaurants.results?.map((restaurant) => (
              <Restaurant
                id={restaurant.id.toString()}
                coverImg={restaurant.coverImg}
                name={restaurant.name}
                categoryName={restaurant.category?.name}
              />
            ))}
          </div>
          <div className="grid grid-cols-3 text-center max-w-md mx-auto items-center mt-10 ">
            {page > 1 ? (
              <button
                onClick={onPrevPageClick}
                className="text-2xl font-bold focus:outline-none"
              >
                &larr;
              </button>
            ) : (
              <div></div>
            )}
            <span className="font-semibold text-md">
              ページ {page} の {data?.restaurants.totalPages}
            </span>
            {page !== data?.restaurants.totalPages ? (
              <button
                onClick={onNextPageClick}
                className="text-2xl font-bold focus:outline-none"
              >
                &rarr;
              </button>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
