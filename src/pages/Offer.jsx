import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
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
      error.response
        ? console.log(error.response.data.message)
        : console.log(error);
    }
  };

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return isLoading ? (
    <div>Chargement en cours....</div>
  ) : (
    <section className="offer-page">
      <div className="col-g">
        <Carousel responsive={responsive}>
          {offer.product_pictures &&
            offer.product_pictures.map((item, index) => (
              <img key={item} src={item.secure_url} />
            ))}
        </Carousel>
      </div>
      <div className="col-d">
        <div className="price">{offer.product_price} €</div>
        <div className="details">
          {offer.product_details.map((detail, index) => (
            <div key={index}>
              <p>{Object.keys(detail)[0]}</p>
              <div className="detail">{detail[Object.keys(detail)[0]]}</div>
            </div>
          ))}
        </div>
        <hr></hr>
        <p className="name">{offer.product_name}</p>
        <p className="desc">{offer.product_description}</p>
        <div className="owner">
          <div className="avatar">
            {offer.owner.account.avatar && (
              <img
                src={offer.owner.account.avatar.secure_url}
                alt="image du propriétaire"
              />
            )}
          </div>
          <p className="username">{offer.owner.account.username}</p>
        </div>
        <button className="fill-primary">Acheter</button>
      </div>
    </section>
  );
};

export default Offer;
