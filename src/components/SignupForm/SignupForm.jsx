import { Link } from "react-router-dom";
import "./SignupForm.css";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import handleChange from "../../utils/handleChange";

const SignupForm = ({ setIsAuthenticated, setModal }) => {
  const [hasError, setHasError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    newsletter: false,
  });

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        formData
      );
      Cookies.set("token", response.data.token, { expires: 1 });
      setIsAuthenticated(true);
      setModal({ isVisible: false });
    } catch (error) {
      error.response
        ? setHasError(error.response.data.message)
        : console.log(error.message);
    }
  };

  return (
    <form id="SignupForm" onSubmit={handleSubmit}>
      <h2>S'inscrire</h2>
      <label>
        <span>Nom d'utilisateur</span>
        <input
          type="text"
          name="username"
          placeholder="Nom d'utilisateur"
          value={formData.username}
          onChange={(event) => handleChange(event, formData, setFormData)}
        />
      </label>
      <label>
        <span>Email</span>
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={(event) => handleChange(event, formData, setFormData)}
        />
      </label>
      <label>
        <span>Password</span>
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={formData.password}
          onChange={(event) => handleChange(event, formData, setFormData)}
        />
      </label>
      <div>
        <div className="newletter">
          <input
            type="checkbox"
            name="newsletter"
            checked={formData.newsletter}
            onChange={(event) => handleChange(event, formData, setFormData)}
          />
          <span>S'inscrire à la newletter</span>
        </div>{" "}
        <p>
          En m'inscrivant je confirme avoir lu et accepté les Termes &
          Conditions et Politique de Confidentialité de Vinted. Je confirme
          avoir au moins 18 ans.
        </p>
      </div>
      {hasError && (
        <p className="error">
          Erreur d'enregistrement, le server indique : "{hasError}"
        </p>
      )}
      <button type="submit" className="fill-primary">
        S'inscrire
      </button>
      <Link to="/Login">
        <p>Tu as déjà un compte ? Connecte-toi !</p>
      </Link>
    </form>
  );
};

export default SignupForm;
