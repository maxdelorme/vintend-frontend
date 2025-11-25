import { IoMdRemoveCircle } from "react-icons/io";
import { useBasketContext } from "./BasketContentProvider";
import myFormat from "../../utils/EuroFormat";

const BasketItem = ({ item }) => {
  const { addRemoveItem } = useBasketContext();
  const { id, count, price, title } = item;
  return (
    <div className="basketItem">
      <span className="counter">
        <IoMdRemoveCircle
          onClick={() => {
            addRemoveItem(id, count - 1);
          }}
        />
      </span>
      <span className="title">{title}</span>
      <span className="price">{myFormat(price * count)}</span>
    </div>
  );
};

export default BasketItem;
