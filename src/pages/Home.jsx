import axios from "axios";
import { useState, useEffect } from "react";
import OfferCard from "../components/OfferCard/OfferCard";

const Home = ({ search, range, sort }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  var pages = 0;
  const offerPerPage = 15;

  useEffect(() => {
    var ignore = false;
    const getData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers",
          {
            params: {
              title: search,
              page: page,
              limit: offerPerPage,
              priceMax: range.max,
              priceMin: range.min,
              sort: sort ? "price-desc" : "price-asc",
            },
          }
        );
        if (!ignore) {
          setData(response.data);
          setIsLoading(false);
        }
      } catch (error) {
        error.response
          ? console.log(error.response.data.message)
          : console.log(error);
      }
    };

    getData();
    // ensure the fetchData are discard even a quicker research is made before the end of the previous slow one
    return () => {
      ignore = true;
    };
  }, [search, page, range, sort]);

  if (!isLoading) {
    pages = Math.ceil(data.count / offerPerPage);
  }

  return isLoading ? (
    <div>Chargement en cours....</div>
  ) : (
    <>
      <nav>
        <span className="numberResponses">
          <strong>{data.count} </strong> réponse{data.count > 1 ? "s" : ""}
        </span>
        Pages :{" "}
        <ol className="pages">
          {new Array(pages).fill("").map((item, index) => (
            <li
              key={index}
              onClick={() => {
                setPage(index + 1);
              }}
              className={page === index + 1 ? "active" : ""}
            >
              {index + 1}
            </li>
          ))}
        </ol>
      </nav>
      <section className="listOffers">
        {data.offers.map((item) => (
          <OfferCard key={item._id} {...item}></OfferCard>
        ))}
      </section>
    </>
  );
};

export default Home;
