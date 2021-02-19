import { gql } from "@apollo/client";


//How to make fragments?
export const RESTAURANT_FRAGMENT = gql`
  fragment RestaurantParts on RestaurantEntity {
    id
    name
    coverImg
    category {
      name
    }
    address
  }
`;
