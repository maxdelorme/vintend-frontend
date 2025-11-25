import "./paiement.css";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/CheckOutForm/CheckOutForm";
import { useEffect } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import { Link } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
);

const PaiementPage = ({
  modal,
  setModal,
  isAuthenticated,
  setIsAuthenticated,
  basket,
  setBasket,
}) => {
  useEffect(() => {
    // display modal if unauthenticated
    if (!isAuthenticated) {
      setModal({
        isVisible: true,
        children: (
          <LoginForm
            setIsAuthenticated={setIsAuthenticated}
            setModal={setModal}
          ></LoginForm>
        ),
      });
    }
  }, [isAuthenticated, modal.isVisible]);

  let options = {};
  let title = null;
  if (basket.length > 0) {
    title = basket[0].product_name;
    options = {
      // Type de transaction
      mode: "payment",
      // Montant de la transaction
      amount: basket[0].product_price * 100,
      // Devise de la transaction
      currency: "eur",
      // On peut customiser l'apparence ici
      appearance: {
        /*...*/
      },
    };
  }

  return (
    <main className="div container">
      {basket.length === 0 ? (
        <p>
          Votre Panier est vide, merci de retourner{" "}
          <Link to="/">sur une page d'offre</Link>
        </p>
      ) : (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm
            title={title}
            amount={options.amount}
            setBasket={setBasket}
          />
        </Elements>
      )}
    </main>
  );
};

export default PaiementPage;
