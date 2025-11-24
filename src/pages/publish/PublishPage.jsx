import LoginForm from "../../components/LoginForm/LoginForm";
import "./publishPage.css";
import { useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import handleChange from "../../assets/utils/handleChange";
import { useState, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import Dropzone from "react-dropzone";

const PublishPage = ({
  modal,
  setModal,
  isAuthenticated,
  setIsAuthenticated,
}) => {
  // console.log(setModal);
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

  const [formState, setFormState] = useState({});
  const form = useRef();
  const hiddenInput = useRef();

  const onSubmit = async (formData) => {
    try {
      //because formData do not provide value if the checkbox is unchecked
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

  // get url of preview images
  let previewUrl = [];
  if (formState.picture) {
    const formData = new FormData(form.current);
    const previews = formData.getAll("picture");
    previewUrl = previews.map((preview) => URL.createObjectURL(preview));
  }

  return (
    <form className="publishForm" action={onSubmit} ref={form}>
      <h2>Vends ton article</h2>
      <section className="upload">
        <Dropzone
          name="dropfiles"
          onDrop={(acceptedFiles) => {
            console.log(acceptedFiles);
            // Note the specific way we need to munge the file into the hidden input
            // https://stackoverflow.com/a/68182158/1068446
            let dataTransfer = new DataTransfer();
            acceptedFiles.forEach((file) => {
              dataTransfer.items.add(file);
            });
            hiddenInput.current.files = dataTransfer.files;
            console.log(new FormData(form.current));
            setFormState({ ...formState, picture: dataTransfer.files });
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
              </div>
            </section>
          )}
        </Dropzone>
        <label>
          {formState.picture && (
            <div className="previews">
              {previewUrl.map((url, index) => (
                <div key={index} className="preview">
                  <img src={url}></img>
                </div>
              ))}
              <div
                className="closeButton"
                onClick={(event) => {
                  event.preventDefault();
                  setFormState({ ...formState, picture: null });
                }}
              >
                <IoMdClose />
              </div>
            </div>
          )}
          <div className="btn outline">
            {formState.picture ? "Remplace ta photo" : "+ Ajoute une photo"}
          </div>
          <input
            onChange={(event) =>
              setFormState({ ...formState, picture: [...event.target.files] })
            }
            type="file"
            name="picture"
            multiple
            ref={hiddenInput}
          ></input>
        </label>
      </section>
      <section>
        <label>
          <span>Titre</span>
          <input
            onChange={(event) => handleChange(event, formState, setFormState)}
            placeholder="title"
            value={form.title}
            name="title"
          />
        </label>
        <label>
          <span>Descris ton article</span>
          <textarea
            placeholder="descripton"
            value={form.description}
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
            value={form.brand}
            name="brand"
          />
        </label>
        <label>
          <span>Taille</span>
          <input
            onChange={(event) => handleChange(event, formState, setFormState)}
            placeholder="size"
            value={form.size}
            name="size"
          />
        </label>
        <label>
          <span>Couleur</span>
          <input
            onChange={(event) => handleChange(event, formState, setFormState)}
            placeholder="color"
            value={form.color}
            name="color"
          />
        </label>
        <label>
          <span>Etat</span>
          <input
            onChange={(event) => handleChange(event, formState, setFormState)}
            placeholder="condition"
            value={form.condition}
            name="condition"
          />
        </label>
        <label>
          <span>Lieu</span>
          <input
            onChange={(event) => handleChange(event, formState, setFormState)}
            placeholder="city"
            value={form.city}
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
            value={form.price}
            name="price"
          />
          <em>€</em>
        </label>
        <label>
          <input
            onChange={(event) => handleChange(event, formState, setFormState)}
            type="checkbox"
            checked={form.switch}
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
