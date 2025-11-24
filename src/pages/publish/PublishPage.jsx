import LoginForm from "../../components/LoginForm/LoginForm";
import "./publishPage.css";
import { useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import handleChange from "../../assets/utils/handleChange";
import { useState, useRef } from "react";
import { IoMdClose } from "react-icons/io";

const PublishPage = ({
  modal,
  setModal,
  isAuthenticated,
  setIsAuthenticated,
}) => {
  // console.log(setModal);
  useEffect(() => {
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
      // navigate({ pathname: "/" });
    }
  }, [isAuthenticated, modal.isVisible]);

  const [formState, setFormState] = useState({});
  const form = useRef();

  const onSubmit = async (formData) => {
    try {
      formData.set("switch", Boolean(formData.get("switch")));
      const token = Cookies.get("token");

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        { headers: { authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.log(error.response);
    }
  };

  let previewUrl = "";
  if (formState.picture) {
    const formData = new FormData(form.current);
    const preview = formData.get("picture");
    previewUrl = URL.createObjectURL(preview);
  }

  return (
    <form className="publishForm" action={onSubmit} ref={form}>
      <h2>Vends ton article</h2>
      <section className="upload">
        <label>
          {formState.picture && (
            <>
              <img src={previewUrl} className="preview"></img>
              <div
                className="closeButton"
                onClick={(event) => {
                  event.preventDefault();
                  setFormState({ ...formState, picture: null });
                }}
              >
                <IoMdClose />
              </div>
            </>
          )}
          <div className="btn outline">
            {formState.picture ? "Remplace ta photo" : "+ Ajoute une photo"}
          </div>
          <input
            onChange={(event) => handleChange(event, formState, setFormState)}
            type="file"
            name="picture"
          ></input>
        </label>
      </section>
      <section>
        <label>
          <span>Titre</span>
          <input
            onChange={(event) => handleChange(event, formState, setFormState)}
            placeholder="title"
            name="title"
          />
        </label>
        <label>
          <span>Descris ton article</span>
          <textarea
            placeholder="descripton"
            name="description"
            onChange={(event) => handleChange(event, formState, setFormState)}
          />
        </label>
      </section>
      <section>
        <label>
          <span>Marque</span>
          <input
            onChange={(event) => handleChange(event, formState, setFormState)}
            placeholder="title"
            name="brand"
          />
        </label>
        <label>
          <span>Taille</span>
          <input
            onChange={(event) => handleChange(event, formState, setFormState)}
            placeholder="size"
            name="size"
          />
        </label>
        <label>
          <span>Couleur</span>
          <input
            onChange={(event) => handleChange(event, formState, setFormState)}
            placeholder="color"
            name="color"
          />
        </label>
        <label>
          <span>Etat</span>
          <input
            onChange={(event) => handleChange(event, formState, setFormState)}
            placeholder="condition"
            name="condition"
          />
        </label>
        <label>
          <span>Lieu</span>
          <input
            onChange={(event) => handleChange(event, formState, setFormState)}
            placeholder="city"
            name="city"
          />
        </label>
      </section>
      <section>
        <label>
          <span>Prix</span>
          <input
            onChange={(event) => handleChange(event, formState, setFormState)}
            placeholder="price"
            name="price"
          />
          <em>€</em>
        </label>
        <label>
          <input
            onChange={(event) => handleChange(event, formState, setFormState)}
            type="checkbox"
            name="switch"
          />
          <span>Je suis intéressé par des échanges</span>
        </label>
      </section>
      <button className="fill-primary">Ajouter</button>
    </form>
  );
};

export default PublishPage;
