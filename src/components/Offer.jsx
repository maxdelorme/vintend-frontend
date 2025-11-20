import { Link } from "react-router-dom";
const Offer = ({
  _id,
  product_name,
  product_price,
  product_image,
  product_description,
  product_details,
  owner,
}) => {
  //   {
  //   "_id": "6919b7bb436ae1fe8f07f42c",
  //   "product_name": "Test",
  //   "product_description": "Rien de special",
  //   "product_price": 1,
  //   "product_details": [
  //     {
  //       "MARQUE": ""
  //     },
  //     {
  //       "TAILLE": ""
  //     },
  //     {
  //       "ÉTAT": ""
  //     },
  //     {
  //       "COULEUR": ""
  //     },
  //     {
  //       "EMPLACEMENT": ""
  //     }
  //   ],
  //   "product_pictures": [
  //     {
  //       "asset_id": "be08d076c8033e5e96058ecc923e4f59",
  //       "public_id": "api/vinted-v2/offers/6919b7bb436ae1fe8f07f42c/preview",
  //       "version": 1763293116,
  //       "version_id": "50f0757d55fdf2be74a04cfd0fe3977c",
  //       "signature": "3011ed5b47ae5272b53442bea0c851a5c2083116",
  //       "width": 1200,
  //       "height": 1059,
  //       "format": "webp",
  //       "resource_type": "image",
  //       "created_at": "2025-11-16T11:38:36Z",
  //       "tags": [],
  //       "pages": 1,
  //       "bytes": 212308,
  //       "type": "upload",
  //       "etag": "8fd355592445ee38f4e09a68f2e2c93d",
  //       "placeholder": false,
  //       "url": "http://res.cloudinary.com/lereacteur/image/upload/v1763293116/api/vinted-v2/offers/6919b7bb436ae1fe8f07f42c/preview.webp",
  //       "secure_url": "https://res.cloudinary.com/lereacteur/image/upload/v1763293116/api/vinted-v2/offers/6919b7bb436ae1fe8f07f42c/preview.webp",
  //       "folder": "api/vinted-v2/offers/6919b7bb436ae1fe8f07f42c",
  //       "access_mode": "public",
  //       "api_key": "361833749344571"
  //     }
  //   ],
  //   "owner": {
  //     "account": {
  //       "username": "seressy"
  //     },
  //     "_id": "6919b79a436ae1fe8f07f426"
  //   },
  //   "product_image": {
  //     "asset_id": "be08d076c8033e5e96058ecc923e4f59",
  //     "public_id": "api/vinted-v2/offers/6919b7bb436ae1fe8f07f42c/preview",
  //     "version": 1763293116,
  //     "version_id": "50f0757d55fdf2be74a04cfd0fe3977c",
  //     "signature": "3011ed5b47ae5272b53442bea0c851a5c2083116",
  //     "width": 1200,
  //     "height": 1059,
  //     "format": "webp",
  //     "resource_type": "image",
  //     "created_at": "2025-11-16T11:38:36Z",
  //     "tags": [],
  //     "pages": 1,
  //     "bytes": 212308,
  //     "type": "upload",
  //     "etag": "8fd355592445ee38f4e09a68f2e2c93d",
  //     "placeholder": false,
  //     "url": "http://res.cloudinary.com/lereacteur/image/upload/v1763293116/api/vinted-v2/offers/6919b7bb436ae1fe8f07f42c/preview.webp",
  //     "secure_url": "https://res.cloudinary.com/lereacteur/image/upload/v1763293116/api/vinted-v2/offers/6919b7bb436ae1fe8f07f42c/preview.webp",
  //     "folder": "api/vinted-v2/offers/6919b7bb436ae1fe8f07f42c",
  //     "access_mode": "public",
  //     "api_key": "361833749344571"
  //   },
  //   "product_date": "2025-11-16T11:38:35.399Z",
  //   "__v": 0
  // }

  const detailsObject = product_details.reduce((result, item) => {
    const key = Object.keys(item)[0];
    result[key] = item[key];
    return result;
  }, {});

  return (
    <Link to={`/offers/${_id}`}>
      <article className="offer">
        <div className="entete">
          <img
            src={owner.account.avatar.secure_url}
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

export default Offer;
