import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
const Offer = () => {
  const { id } = useParams();
  const [offer, setOffer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getOffer();
  }, []);

  const getOffer = async () => {
    try {
      const response = await axios.get(
        `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
      );
      setOffer(response.data);

      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  // <p>_id</p>
  // <p>product_name</p>
  // <p>product_description</p>
  // <p>product_price</p>
  // <p>product_details</p>
  // <p>product_pictures</p>
  // <p>owner</p>
  // <p>product_date</p>
  // <p>product_image</p>
  // <p>__v</p>

  return isLoading ? (
    <div>Chargement en cours....</div>
  ) : (
    <div className="offer-page">
      <div className="col-g">
        <img
          src={offer.product_image.secure_url}
          alt={offer.product_description}
        />
      </div>
      <div className="col-d">
        <div className="price">{offer.product_price} €</div>
        <div className="details">
          {offer.product_details.map((detail) => (
            <div>
              <p>{Object.keys(detail)[0]}</p>
              <div className="detail">{detail[Object.keys(detail)[0]]}</div>
            </div>
          ))}
        </div>
        <hr></hr>
        <div className="name">{offer.product_name}</div>
        <div className="desc">{offer.product_description}</div>
        <div className="owner">
          <div className="avatar">
            {offer.owner.account.avatar && (
              <img src={offer.owner.account.avatar.secure_url} />
            )}
          </div>
          <div className="username">{offer.owner.account.username}</div>
        </div>
        <button className="fill-primary">Acheter</button>
      </div>
    </div>
  );
};

export default Offer;
