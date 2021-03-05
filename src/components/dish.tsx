interface IProps {
  name: string;
  description: string;
  price: number;
}

export const Dish: React.FC<IProps> = ({ name, description, price }) => {
  return (
    <div className="px-4 pt-4 pb-8 border-2 hover:border-yellow-500 transition-all flex">
      <div>
        <div className="mb-5">
          <h3 className="text-lg font-medium">{name}</h3>
          <h4 className="font-medium">{description}</h4>
        </div>
        <span className="font-medium text-lg">{`￥${price}`}</span>
      </div>
      <div>
        this is photo area
      </div>
    </div>
  );
};
