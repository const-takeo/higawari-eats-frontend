import { Link } from "react-router-dom";

interface IRestaurantProps {
  id: string;
  coverImg: string;
  name: string;
  categoryName?: string;
}

export const Restaurant: React.FC<IRestaurantProps> = ({
  id,
  coverImg,
  name,
  categoryName,
}) => (
  <Link to={`/restaurant/${id}`}>
    <div>
      <div
        style={{ backgroundImage: `url(${coverImg})` }}
        className="bg-red-300 py-28 bg-cover bg-center mb-3"
      ></div>
      <h3 className=" text-lg font-medium">
        {name.length < 35 ? name : `${name.substring(0, 35)}...`}
      </h3>
      <div className="border-t mt-3 py-3 text-sm opacity-50 border-gray-500">
        {categoryName}
      </div>
    </div>
  </Link>
);
