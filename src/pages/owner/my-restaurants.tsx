import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Restaurant } from "../../components/restaurant";
import { RESTAURANT_FRAGMENT } from "../../fragments";
import { myRestaurants } from "../../__generated__/myRestaurants";

export const MY_RESTAURANTS_QUERY = gql`
  query myRestaurants {
    myRestaurants {
      ok
      error
      restaurants {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

export const MyRestaurants = () => {
  const { data } = useQuery<myRestaurants>(MY_RESTAURANTS_QUERY);
  console.log(data);
  return (
    <div>
      <Helmet>
        <title> My Restaurants | Higawari Eats</title>
      </Helmet>
      <div className="max-w-screen-2xl mx-auto mt-32">
        <h2 className="text-4xl font-medium mb-10">MyRestaurants</h2>
        {data?.myRestaurants.ok &&
        data.myRestaurants.restaurants?.length === 0 ? (
          <>
            <h4 className="text-xl mb-5">レストランがありません</h4>
            <Link
              to="/add-restaurant"
              className="text-yellow-600 text-opacity-75 hover:underline"
            >
              レストランを作りましょう &rarr;
            </Link>
          </>
        ) : (
          <div className="md:grid grid-cols-3 gap-x-7 gap-y-10 mt-8">
            {data?.myRestaurants?.restaurants?.map((restaurant) => (
              <Restaurant
                key={restaurant.id}
                id={restaurant.id.toString()}
                coverImg={restaurant.coverImg}
                name={restaurant.name}
                categoryName={restaurant.category?.name}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
