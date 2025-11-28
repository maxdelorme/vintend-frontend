import axios from "axios";
import { useState, useEffect } from "react";
import OfferCard from "../../components/OfferCard/OfferCard";
import { useSearchParams } from "react-router-dom";
import "./home.css";

const Home = ({ search, range, sort }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  var pages = 0;
  const offerPerPage = 15;

  const [currentQueryParams, setQueryParams] = useSearchParams();
  const [page, setPage] = useState(currentQueryParams.get("page"));

  // remove the grey background and put it again when destroying component
  useEffect(() => {
    const rootClassList = document.querySelector("#root").classList;
    rootClassList.remove("with-bg");
    return () => {
      const rootClassList = document.querySelector("#root").classList;
      rootClassList.add("with-bg");
    };
  }, []);
  //reset page if there is a change on search, range, page, sort
  useEffect(() => {
    setPage(1);
  }, [search, range]);
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
    // Calcul du nombre de pages disponible
    pages = Math.ceil(data.count / offerPerPage);
  }

  return isLoading ? (
    <div>Chargement en cours....</div>
  ) : (
    <div className="homePage">
      {/* Affichage de la liste des liens vers la page */}
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
                if (page)
                  setQueryParams((prev) => {
                    prev.set("page", index + 1);
                    return prev;
                  });
                else {
                  setQueryParams((prev) => {
                    prev.delete("page");
                    return prev;
                  });
                }
              }}
              className={page === index + 1 ? "active" : ""}
            >
              {index + 1}
            </li>
          ))}
        </ol>
      </nav>
      {/* affichage de la liste des offres */}
      <section className="listOffers">
        {data.offers.map((item) => (
          <OfferCard key={item._id} {...item}></OfferCard>
        ))}
      </section>
    </div>
  );
};

export default Home;
