import axios from "axios";
import { useState, useEffect } from "react";
import Offer from "../components/Offer";
const Home = ({ search }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  var pages = 0;
  const offerPerPage = 15;

  useEffect(() => {
    getData();
  }, [search, page]);

  const getData = async () => {
    try {
      const response = await axios.get(
        "https://lereacteur-vinted-api.herokuapp.com/offers",
        {
          params: {
            title: search,
            page: page,
            limit: offerPerPage,
          },
        }
      );
      setData(response.data);

      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  if (!isLoading) {
    pages = Math.ceil(data.count / offerPerPage);
  }

  return isLoading ? (
    <div>Chargement en cours....</div>
  ) : (
    <>
      <nav>
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
      <div className="listOffers">
        {data.offers.map((item) => (
          <Offer key={item._id} {...item}></Offer>
        ))}
      </div>
    </>
  );
};

export default Home;
