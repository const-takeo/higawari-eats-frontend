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
    isPromoted
  }
`;

export const CATEGORY_FRAGMENT = gql`
  fragment CategoryParts on CategoryEntity {
    id
    name
    coverImg
    slug
    restaurantCount
  }
`;

export const MENU_FRAGMENT = gql`
  fragment MenuParts on DishEntity {
    id
    name
    price
    photo
    description
    options {
      name
      extra
      choices {
        name
        extra
      }
    }
  }
`;
