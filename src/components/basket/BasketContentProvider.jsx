import { createContext, useContext, useState } from "react";

const BasketContentContext = createContext("toto");

export const BasketContentProvider = ({ children }) => {
  const [basketContent, setBasketContent] = useState([]);
  const transportPrice = 2.5;

  const value = {
    basketContent: basketContent,
    addItemToBasket: (id, price, title) => {
      const newItem = { id: id, price: price, title: title, count: 1 };
      if (basketContent) {
        const item = basketContent.find((item) => item.id === id);
        if (!item) {
          setBasketContent([...basketContent, newItem]);
        }
      } else {
        setBasketContent([newItem]);
      }
    },
    clearBasket: () => {
      setBasketContent([]);
    },
    getTransportPrice: () => {
      return transportPrice;
    },
    getSubTotal: () => {
      return basketContent.reduce((sum, item) => {
        sum += item.count * item.price;
        return sum;
      }, 0);
    },
    getTotal: () => {
      return basketContent.reduce((sum, item) => {
        sum += item.count * item.price;
        return sum;
      }, transportPrice);
    },
    addRemoveItem: (id, newCount) => {
      if (newCount > 0) {
        setBasketContent(
          basketContent.map((item) =>
            item.id === id
              ? {
                  ...item,
                  count: newCount,
                }
              : item
          )
        );
      } else {
        setBasketContent(basketContent.filter((item) => item.id !== id));
      }
    },
  };
  return (
    <BasketContentContext.Provider value={value}>
      {children}
    </BasketContentContext.Provider>
  );
};

export const useBasketContext = () => {
  const context = useContext(BasketContentContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a BacketContentProvider");

  return context;
};
