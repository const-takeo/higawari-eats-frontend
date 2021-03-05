import { gql, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import {
  createDish,
  createDishVariables,
} from "../../__generated__/createDish";

const CREATE_DISH_MUTATION = gql`
  mutation createDish($input: CreateDishInput!) {
    createDish(input: $input) {
      error
      ok
    }
  }
`;

interface IParams {
  restaurantId: string;
}

export const AddMenu = () => {
  const { restaurantId } = useParams<IParams>();
  const [createDishMutation, { loading }] = useMutation<
    createDish,
    createDishVariables
  >(CREATE_DISH_MUTATION);
  return <div>addMenu</div>;
};
