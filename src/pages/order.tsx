import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router";
import { getOrder, getOrderVariables } from "../__generated__/getOrder";

interface IParams {
  id: string;
}

const GET_ORDERS = gql`
  query getOrder($input: GetOrderInput!) {
    getOrder(input: $input) {
      ok
      error
      order {
        id
        status
        total
        driver {
          email
        }
        customer {
          email
        }
        restaurant {
          name
        }
      }
    }
  }
`;
export const Order = () => {
  const params = useParams<IParams>();
  const { data } = useQuery<getOrder, getOrderVariables>(GET_ORDERS, {
    variables: {
      input: {
        id: +params.id,
      },
    },
  });
  console.log(data);
  return <div>{params.id}</div>;
};
