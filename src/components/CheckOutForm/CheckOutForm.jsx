import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import axios from "axios";
import { useBasketContext } from "../basket/BasketContentProvider";

const CheckoutForm = ({ title, amount }) => {
  const { clearBasket } = useBasketContext();

  // Permet de faire une requête à Stripe pour confirmer le paiement
  const stripe = useStripe();
  // Permet de récupérer le contenu des inputs
  const elements = useElements();

  // State qui gère les messages d'erreurs
  const [errorMessage, setErrorMessage] = useState(null);
  // State qui gère le fait que le paiement a été effectué
  const [completed, setCompleted] = useState(false);
  // State qui gère le fait qu'on est en train de payer
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      // On commence à charger
      setIsLoading(true);

      if (elements == null) {
        return;
      }

      // Vérification et validation des infos entrées dans les inputs
      const { error: submitError } = await elements.submit();
      if (submitError) {
        // Affiche l'erreur en question
        setErrorMessage(submitError.message);
        setIsLoading(false);
        return;
      }
      console.log("body", {
        title,
        amount,
      });
      // Demande au backend de créer l'intention de paiement, il nous renvoie le clientSecret
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/v2/payment",
        {
          title,
          amount,
        }
      );

      const clientSecret = response.data.client_secret;

      // Requête à Stripe pour valider le paiement
      const stripeResponse = await stripe.confirmPayment({
        // elements contient les infos et la configuration du paiement
        elements,
        clientSecret,
        // Éventuelle redirection
        confirmParams: {
          return_url: "http://localhost:5173/",
        },
        // Bloque la redirections
        redirect: "if_required",
      });

      // Si une erreur a lieu pendant la confirmation
      if (stripeResponse.error) {
        // On la montre au client
        setErrorMessage(stripeResponse.error.message);
        setIsLoading(false);
      }

      // Si on reçois un status succeeded on fais passer completed à true
      if (stripeResponse.paymentIntent.status === "succeeded") {
        setCompleted(true);
        clearBasket();
      }
      // On a fini de charger
      setIsLoading(false);
    } catch (error) {
      !error.response
        ? console.log(error.reponse.data.message)
        : console.log(error.message);
    }
  };

  return completed ? (
    <p>Paiement effectué</p>
  ) : (
    <form onSubmit={handleSubmit}>
      <h2>Procéder au paiement</h2>
      <PaymentElement />
      <button
        type="submit"
        className="fill-primary"
        disabled={!stripe || !elements || isLoading}
      >
        Pay
      </button>
      {/* Éventuel message d'erreur */}
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};

export default CheckoutForm;
