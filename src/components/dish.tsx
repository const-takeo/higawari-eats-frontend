import { restaurant_restaurant_restaurant_menu_options } from "../__generated__/restaurant";

interface IProps {
  name: string;
  description: string;
  price: number;
  isCoustomer?: boolean;
  options?: restaurant_restaurant_restaurant_menu_options[] | null;
}

export const Dish: React.FC<IProps> = ({
  name,
  description,
  price,
  options,
  isCoustomer = false,
}) => {
  return (
    <div className="px-4 pt-4 pb-8 border-2 hover:border-yellow-500 transition-all">
      <div>
        <div className="mb-5">
          <h3 className="text-lg font-medium">{name}</h3>
          <h4 className="font-medium">{description}</h4>
        </div>
        <span className="font-medium text-lg">{`￥${price}`}</span>
      </div>
      {isCoustomer && options && options.length !== 0 && (
        <div>
          <h5 className="mt-8 mb-3 font-medium font-semibold">オプション</h5>
          {options?.map((option, index) => (
            <span className="flex items-center" key={index}>
              <h6 className="mr-3">{option.name}</h6>
              <h6 className="text-sm opacity-70">￥{option.extra}</h6>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
