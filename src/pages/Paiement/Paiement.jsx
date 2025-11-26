import "./paiement.css";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/CheckOutForm/CheckOutForm";
import { useEffect } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import { Link, Navigate } from "react-router-dom";
import { useBasketContext } from "../../components/basket/BasketContentProvider";
import { useState } from "react";

const stripePromise = loadStripe(
  "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
);

const PaiementPage = ({
  modal,
  setModal,
  isAuthenticated,
  setIsAuthenticated,
}) => {
  const { getTotal, basketContent } = useBasketContext();
  const [hasDisplayModal, setHasDisplayModal] = useState(false);

  useEffect(() => {
    // display modal if unauthenticated
    if (!isAuthenticated) {
      setHasDisplayModal(true);
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
  }, [isAuthenticated]);

  let options = {};
  let title = null;
  if (basketContent.length > 0) {
    title = `${basketContent.length} products on Vinted by Maxouille`;
    options = {
      // Type de transaction
      mode: "payment",
      // Montant de la transaction
      amount: getTotal() * 100,
      // Devise de la transaction
      currency: "eur",
      // On peut customiser l'apparence ici
      appearance: {
        /*...*/
      },
    };
  }

  return hasDisplayModal && !isAuthenticated && !modal.isVisible ? (
    <Navigate to="/" />
  ) : (
    <section className="paiement">
      {basketContent.length === 0 ? (
        <p>
          Votre Panier est vide, merci de retourner{" "}
          <Link to="/">sur une page d'offre</Link>
        </p>
      ) : (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm title={title} amount={options.amount} />
        </Elements>
      )}
    </section>
  );
};

export default PaiementPage;
