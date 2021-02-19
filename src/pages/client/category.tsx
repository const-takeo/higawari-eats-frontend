import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { CATEGORY_FRAGMENT, RESTAURANT_FRAGMENT } from "../../fragments";
import { category, categoryVariables } from "../../__generated__/category";

const CATEGORY_QUERY = gql`
  query category($input: CategoryInput!) {
    category(input: $input) {
      ok
      error
      totalPages
      totalResults
      restaurants {
        ...RestaurantParts
      }
      category {
        ...CategoryParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${CATEGORY_FRAGMENT}
`;

interface IPProps {
  slug: string;
}

export const Category = () => {
  //   const location = useLocation();
  //onlyパラメーターだけ欲しい時,useLocationより楽
  const params = useParams<IPProps>();
  const { data, loading } = useQuery<category, categoryVariables>(
    CATEGORY_QUERY,
    {
      variables: {
        input: {
          slug: params.slug,
          page: 1,
        },
      },
    }
  );
  console.log(data, loading);
  return <div>Category</div>;
};
