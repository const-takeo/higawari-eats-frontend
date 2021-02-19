import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { CategoryList } from "../../components/category-list";
import { Restaurant } from "../../components/restaurant";
import { CATEGORY_FRAGMENT, RESTAURANT_FRAGMENT } from "../../fragments";
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
        ...CategoryParts
      }
    }
    restaurants(input: $input) {
      ok
      error
      totalPages
      totalResults
      results {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${CATEGORY_FRAGMENT}
`;

interface IFormProps {
  searchTerm: string;
}

export const Restaurants = () => {
  const { register, handleSubmit, getValues } = useForm<IFormProps>();
  const history = useHistory();
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
  const onSearchSubmit = () => {
    const { searchTerm } = getValues();
    history.push({
      pathname: "/search",
      search: `?term=${searchTerm}`,
    });
  };
  return (
    <div>
      <Helmet>
        <title>Home | Higawari Eats</title>
      </Helmet>
      <form
        onSubmit={handleSubmit(onSearchSubmit)}
        style={{
          backgroundImage: `url(https://resources.matcha-jp.com/archive_files/jp/2016/09/what_is_sakura.jpg)`,
        }}
        className="w-full py-40 flex items-center justify-center bg-cover bg-center mx-auto max-w-screen-2xl"
      >
        <input
          name="searchTerm"
          ref={register({ required: true, min: 2 })}
          className="inputCss w-3/4 border-0 items-center justify-center md:w-3/12"
          type="Search"
          placeholder="探してるレストランは？"
        />
      </form>
      {!loading && (
        <div className="mt-8 mx-auto max-w-screen-2xl mb-20">
          {/* //category component */}
          <CategoryList data={data} />
          {/* // */}
          <div className="md:grid grid-cols-3 gap-x-7 gap-y-10 mt-8">
            {data?.restaurants.results?.map((restaurant) => (
              <Restaurant
                key={restaurant.id}
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
