import { restaurant_restaurant_restaurant_menu_options } from "../__generated__/restaurant";

interface IProps {
  id?: number;
  name: string;
  description: string;
  price: number;
  isCoustomer?: boolean;
  options?: restaurant_restaurant_restaurant_menu_options[] | null;
  order?: boolean;
  isSelected?: boolean;
  addItem?: (dishId: number) => void;
  removeItem?: (dishId: number) => void;
}

export const Dish: React.FC<IProps> = ({
  children: dishOptions,
  removeItem,
  id = 0,
  name,
  isSelected,
  addItem,
  order = false,
  description,
  price,
  options,
  isCoustomer = false,
}) => {
  //method
  const onClick = () => {
    if (order) {
      if (!isSelected && addItem) {
        return addItem(id);
      }
      if (isSelected && removeItem) {
        return removeItem(id);
      }
    }
  };
  //render
  return (
    <div
      className={`px-4 pt-4 pb-8 border-2 hover:border-yellow-500 transition-all ${
        isSelected ? "border-yellow-500" : "hover:border-yellow-500"
      }`}
    >
      <div>
        <div className="mb-5">
          <h3 className="text-lg font-medium">
            {name}
            {order && (
              <button onClick={onClick}>{isSelected ? "削除" : "追加"}</button>
            )}
          </h3>
          <h4 className="font-medium">{description}</h4>
        </div>
        <span className="font-medium text-lg">{`￥${price}`}</span>
      </div>
      {isCoustomer && options && options.length !== 0 && (
        <div>
          <h5 className="mt-8 mb-3 font-medium font-semibold">オプション</h5>
          {dishOptions}
        </div>
      )}
    </div>
  );
};
