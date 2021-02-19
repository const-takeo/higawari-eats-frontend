import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { RESTAURANT_FRAGMENT } from "../../fragments";
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
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
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
    </div>
  );
};
