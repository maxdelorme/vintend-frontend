// carte d'une offre affiché sur la grille du home
import { Link } from "react-router-dom";
import "./offerCard.css";

const OfferCard = ({
  _id,
  product_name,
  product_price,
  product_image,
  product_description,
  product_details,
  owner,
}) => {
  const detailsObject = product_details.reduce((result, item) => {
    const key = Object.keys(item)[0];
    result[key] = item[key];
    return result;
  }, {});

  return (
    <Link to={`/offers/${_id}`}>
      <article className="offerCard">
        <div className="entete">
          <img
            src={owner.account.avatar && owner.account.avatar.secure_url}
            alt="image du propriétaire"
          />
          <p className="name">{owner.account.username}</p>
        </div>

        <img
          src={product_image.secure_url}
          alt={product_description}
          className="image"
        />
        <div className="price">{product_price} €</div>
        <div className="details">
          {["TAILLE", "MARQUE"].map((field, index) => (
            <div key={index} className="detail">
              {detailsObject[field]}
            </div>
          ))}
        </div>
      </article>
    </Link>
  );
};

export default OfferCard;
