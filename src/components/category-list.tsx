import { Link } from "react-router-dom";
import { restaurantPageQuery } from "../__generated__/restaurantPageQuery";

interface ICProps {
  data: restaurantPageQuery | undefined;
}

export const CategoryList: React.FC<ICProps> = ({ data }) => {
  return (
    <div className="justify-around flex max-w-lg mx-auto">
      {data?.allCategories.categories?.map((category) => (
        <Link to={`/category/${category.slug}`}>
          <div
            key={category.id}
            className="flex flex-col items-center cursor-pointer group"
          >
            <div
              className="w-14 h-14 rounded-full bg-cover "
              style={{ backgroundImage: `url(${category.coverImg})` }}
            ></div>
            <span className="mt-3 text-sm text-center font-medium group-hover:bg-gray-200 rounded-lg">
              {category.name}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};
