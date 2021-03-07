interface IDishOptionProps {
  index: number;
  dishId: number;
  isSelected: boolean;
  name: string;
  extra?: number | null;
  addOption: (dishId: number, optionName: string) => void;
  removeOptionFromItem: (dishId: number, optionName: string) => void;
}

export const DishOptions: React.FC<IDishOptionProps> = ({
  addOption,
  removeOptionFromItem,
  isSelected,
  index,
  name,
  extra,
  dishId,
}) => {
  const onClick = () => {
    if (isSelected) {
      removeOptionFromItem(dishId, name);
    } else {
      addOption(dishId, name);
    }
  };
  return (
    <span
      className={`flex items-center border ${
        isSelected ? "border-yellow-500" : ""
      }`}
      key={index}
      onClick={onClick}
    >
      <h6 className="mr-3">{name}</h6>
      {extra && <h6 className="text-sm opacity-70">￥{extra}</h6>}
    </span>
  );
};
