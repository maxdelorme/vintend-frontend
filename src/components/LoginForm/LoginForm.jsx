import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const SignupForm = ({ setIsAuthenticated, setModal }) => {
  const [hasError, setHasError] = useState("");

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const formElements = event.target.form.elements;
      let formData = {};
      for (let i = 0; i < formElements.length; i++) {
        const { name, type, value, checked } = formElements.item(i);
        if (name) {
          formData[name] = type === "checkbox" ? checked : value;
        }
      }

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        formData
      );
      Cookies.set("token", response.data.token, { expires: 1 });

      setIsAuthenticated(true);
      setModal({ isVisible: false });
    } catch (error) {
      error.response
        ? setHasError(
            error.response.data.error
              ? error.response.data.error
              : error.response.data.message
          )
        : console.log(error.message);
    }
  };

  return (
    <form id="LoginForm">
      <h2>Se Connecter</h2>

      <label>
        <span>Email</span>
        <input type="text" name="email" placeholder="Email" />
      </label>
      <label>
        <span>Password</span>
        <input type="password" name="password" placeholder="Mot de passe" />
      </label>
      {hasError && (
        <p className="error">
          Erreur de connexion, le serveur indique : <br />"{hasError}"
        </p>
      )}
      <button type="submit" onClick={handleSubmit} className="fill-primary">
        S'inscrire
      </button>
      <Link to="/signup">
        <p>Pas encore de compte ? inscris-toi </p>
      </Link>
    </form>
  );
};

export default SignupForm;
