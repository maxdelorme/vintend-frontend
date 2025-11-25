import { useBasketContext } from "./BasketContentProvider";
import BasketItem from "./BasketItem";
import myFormat from "../../utils/EuroFormat";
import { useState } from "react";
import "./basket.css";
import { useNavigate, useLocation } from "react-router-dom";

const Basket = () => {
  const { basketContent, getSubTotal, getTotal, getTransportPrice } =
    useBasketContext();
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="basket">
      {!basketContent || !basketContent.length ? (
        <>
          <div className="panel empty">
            <div className="validate">Valider mon panier</div>
            <div className="content">
              <p>Votre panier est vide</p>
            </div>
          </div>
        </>
      ) : (
        <>
          {!isExpanded && (
            <p
              onClick={() => {
                setIsExpanded(true);
              }}
              className="mini-basket"
            >
              <span className="nbItems">{basketContent.length}</span>
              <span>Voir le panier</span>
              <span>
                {myFormat(
                  basketContent.reduce((sum, item) => {
                    sum += item.count * item.price;
                    return sum;
                  }, 2.5)
                )}
              </span>
            </p>
          )}

          <div className={"panel withitems " + (isExpanded ? " expanded" : "")}>
            <div
              className="CloseMe"
              onClick={() => {
                setIsExpanded(false);
              }}
            >
              X
            </div>
            {location.pathname === "/paiement" ? (
              <div className="validate">Panier en cours</div>
            ) : (
              <button
                className="fill-primary"
                onClick={() => {
                  navigate("/paiement");
                }}
              >
                Valider mon panier
              </button>
            )}
            <div className="listItems">
              {basketContent.map((item) => (
                <BasketItem key={item.id + "-" + item.count} item={item} />
              ))}
            </div>
            <hr></hr>

            <div className="subTotal">
              <span>Sous-Total</span>
              <span> {myFormat(getSubTotal())}</span>
            </div>
            <div className="livraison">
              <span>Frais de livraison</span>
              <span>{myFormat(getTransportPrice())}</span>
            </div>
            <hr></hr>
            <div className="total">
              <span>Total</span>
              <span>{myFormat(getTotal())}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Basket;
