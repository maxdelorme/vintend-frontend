import LoginForm from "../../components/LoginForm/LoginForm";
import "./publishPage.css";
import { useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import handleChange from "../../utils/handleChange";
import { useState, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import Dropzone from "react-dropzone";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

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

      navigate("/offers/" + response.data._id);
    } catch (error) {
      error.response
        ? console.log(error.response.data.message)
        : console.log(error);
    }
  };

  // get url of preview images
  let previewUrl = [];
  if (formState.picture && formState.picture.length) {
    const formData = new FormData(form.current);
    const previews = formData.getAll("picture");
    previewUrl = previews.map((preview) => URL.createObjectURL(preview));
  } else {
    formState.picture = null;
  }

  return (
    <main className="with-bg">
      <form className="container publishForm" action={onSubmit} ref={form}>
        <h2>Vends ton article</h2>
        <section className="upload">
          <Dropzone
            name="dropfiles"
            onDrop={(acceptedFiles) => {
              // Note the specific way we need to munge the file into the hidden input
              // https://stackoverflow.com/a/68182158/1068446
              const dataTransfer = new DataTransfer();
              acceptedFiles.forEach((file) => {
                dataTransfer.items.add(file);
              });
              hiddenInput.current.files = dataTransfer.files;
              setFormState({ ...formState, picture: dataTransfer.files });
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <div className="dropZone">
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>
                    Depose une photo ici , ou clique pour ajouter tes photos
                  </p>
                </div>
                {formState.picture && (
                  <div className="previews">
                    {previewUrl.map((url, index) => (
                      <div key={index} className="preview">
                        <img src={url}></img>
                        <div
                          className="closeButton"
                          index={index}
                          onClick={(event) => {
                            event.preventDefault();
                            // recreate a FileList
                            // Note the specific way we need to munge the file into the hidden input
                            // https://stackoverflow.com/a/68182158/1068446
                            const dataTransfer = new DataTransfer();
                            let files = hiddenInput.current.files;
                            for (let i = 0; i < files.length; i++) {
                              if (i !== index) {
                                dataTransfer.items.add(files[i]);
                              }
                            }
                            hiddenInput.current.files = dataTransfer.files;
                            setFormState({
                              ...formState,
                              picture: [...dataTransfer.files],
                            });
                          }}
                        >
                          <IoMdClose />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <input
                  onChange={(event) =>
                    setFormState({
                      ...formState,
                      picture: [...event.target.files],
                    })
                  }
                  type="file"
                  name="picture"
                  multiple
                  ref={hiddenInput}
                ></input>
              </div>
            )}
          </Dropzone>
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
    </main>
  );
};

export default PublishPage;
