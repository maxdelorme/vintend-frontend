import { Link } from "react-router-dom";
import "./SignupForm.css";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";

const SignupForm = ({ setIsAuthenticated, setModal }) => {
  const [hasError, setHasError] = useState({ value: false, message: "" });

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
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        formData
      );
      Cookies.set("token", response.data.token, { expires: 1 });
      setIsAuthenticated(true);
      setModal({ isVisible: false });
    } catch (error) {
      setHasError({ value: true, message: error.response.data.message });
    }
  };

  return (
    <form id="SignupForm">
      <h2>S'inscrire</h2>
      <label>
        <span>Nom d'utilisateur</span>
        <input type="text" name="username" placeholder="Nom d'utilisateur" />
      </label>
      <label>
        <span>Email</span>
        <input type="text" name="email" placeholder="Email" />
      </label>
      <label>
        <span>Password</span>
        <input type="password" name="password" placeholder="Mot de passe" />
      </label>
      <div>
        <div className="newletter">
          <input type="checkbox" name="newsletter" />
          <span>S'inscrire à la newletter</span>
        </div>{" "}
        <p>
          En m'inscrivant je confirme avoir lu et accepté les Termes &
          Conditions et Politique de Confidentialité de Vinted. Je confirme
          avoir au moins 18 ans.
        </p>
      </div>
      {hasError.value && (
        <p className="error">
          Erreur d'enregistrement, le server indique : <p></p>"
          {hasError.message}"
        </p>
      )}
      <button type="submit" onClick={handleSubmit} className="fill-primary">
        S'inscrire
      </button>
      <Link to="/Login">
        <p>Tu as déjà un compte ? Connecte-toi !</p>
      </Link>
    </form>
  );
};

export default SignupForm;
